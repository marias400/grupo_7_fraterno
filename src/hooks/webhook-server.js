// webhook-server.js
const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const APP_DIR = 'Z:\Desktop\grupo_7_fraterno'; // <-- ruta del repo en tu PC
const SECRET = process.env.WEBHOOK_SECRET || 'ar2759kantos'; // setea en env
const PORT = process.env.PORT || 8000; // debe coincidir con el devtunnel

function verifySignature(req, res, buf) {
  const sig = req.headers['x-hub-signature-256'];
  if (!sig) return false;
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(buf);
  const digest = 'sha256=' + hmac.digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(sig));
}

const app = express();
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.post('/webhook', (req, res) => {
  try {
    if (!verifySignature(req, res, req.rawBody)) {
      res.status(401).send('Signature mismatch');
      return;
    }
  } catch (err) {
    res.status(500).send('Error verifying signature');
    return;
  }

  // Opcional: chequear evento y rama
  const event = req.headers['x-github-event'];
  const payload = req.body;
  const branch = (payload.ref || '').replace('refs/heads/', '');

  if (event !== 'push' || branch !== 'main') {
    res.status(200).send('Ignored');
    return;
  }

  res.status(200).send('Deploy started');

  // Ejecutar script de despliegue de forma asíncrona
const deployScript = path.join(APP_DIR, 'deploy.bat');
exec(`cmd /c "${deployScript}"`, (error, stdout, stderr) => {
    const log = `[${new Date().toISOString()}] deploy:\nstdout:\n${stdout}\nstderr:\n${stderr}\nerror:${error}\n\n`;
    fs.appendFileSync(path.join(APP_DIR, 'deploy.log'), log);
  });
});

app.get('/', (req, res) => res.send('webhook listener up'));

app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
