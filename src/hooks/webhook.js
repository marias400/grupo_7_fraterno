// hooks/webhook.js
const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_DIR = 'Z:\\Desktop\\grupo_7_fraterno'; // <-- ruta del repo en tu PC
const SECRET = process.env.WEBHOOK_SECRET || 'ar2759kantos';
const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3001; // puerto diferente al servidor principal

// Configurar logging para webhook
const logsDir = path.join(APP_DIR, "logs");
const webhookLogPath = path.join(logsDir, "webhook.log");

// Crear carpeta logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Crear archivo webhook.log si no existe
if (!fs.existsSync(webhookLogPath)) {
  fs.writeFileSync(webhookLogPath, "");
}

function writeWebhookLog(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFile(webhookLogPath, logMessage, (err) => {
    if (err) console.error("Error al escribir en webhook.log:", err);
  });
}

function verifySignature(req, res, buf) {
  const sig = req.headers['x-hub-signature-256'];
  if (!sig) {
    writeWebhookLog("❌ RECHAZO: No se encontró firma x-hub-signature-256");
    return false;
  }
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(buf);
  const digest = 'sha256=' + hmac.digest('hex');
  const isValid = crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(sig));
  if (!isValid) {
    writeWebhookLog("❌ RECHAZO: Firma inválida - no coincide con el SECRET");
  }
  return isValid;
}

function startWebhook() {
  const app = express();
  
  app.use(express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  }));

  app.post('/webhook', (req, res) => {
    try {
      writeWebhookLog("📨 WEBHOOK RECIBIDO de GitHub");
      
      if (!verifySignature(req, res, req.rawBody)) {
        res.status(401).send('Signature mismatch');
        return;
      }
      
      writeWebhookLog("✅ Firma verificada correctamente");
    } catch (err) {
      writeWebhookLog(`❌ ERROR al verificar firma: ${err.message}`);
      res.status(500).send('Error verifying signature');
      return;
    }

    // Chequear evento y rama
    const event = req.headers['x-github-event'];
    const payload = req.body;
    const branch = (payload.ref || '').replace('refs/heads/', '');
    const sender = payload.sender?.login || 'desconocido';
    const commits = payload.commits?.length || 0;

    writeWebhookLog(`Evento: ${event} | Rama: ${branch} | Usuario: ${sender} | Commits: ${commits}`);

    if (event !== 'push' || branch !== 'main') {
      writeWebhookLog(`⏭️ IGNORADO: No es un push a main (evento: ${event}, rama: ${branch})`);
      res.status(200).send('Ignored');
      return;
    }

    writeWebhookLog(`🚀 INICIANDO DEPLOY desde rama main`);
    res.status(200).send('Deploy started');

    // Ejecutar script de despliegue de forma asíncrona
    const deployScript = path.join(APP_DIR, 'deploy.bat');
    
    if (!fs.existsSync(deployScript)) {
      writeWebhookLog(`❌ ERROR: Script de deploy no encontrado en: ${deployScript}`);
      return;
    }

    exec(`cmd /c "${deployScript}"`, (error, stdout, stderr) => {
      const status = error ? '❌ FAILED' : '✅ SUCCESS';
      const log = `${status}\n[${new Date().toISOString()}] deploy:\nstdout:\n${stdout}\nstderr:\n${stderr}\nerror:${error}\n\n`;
      fs.appendFileSync(webhookLogPath, log);
      writeWebhookLog(`Deploy finalizado: ${status}`);
    });
  });

  app.get('/', (req, res) => {
    res.send('🟢 Webhook listener activo y escuchando en puerto ' + WEBHOOK_PORT);
  });

  app.listen(WEBHOOK_PORT, () => {
    writeWebhookLog(`🚀 Webhook server iniciado en puerto ${WEBHOOK_PORT}`);
    console.log(`🚀 Webhook server listening on port ${WEBHOOK_PORT}`);
  });
}

module.exports = { startWebhook };