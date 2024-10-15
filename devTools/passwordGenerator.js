const bcryptjs = require("bcryptjs");
// actualizar contraseñas en db
// UPDATE fraterno.users
// SET password = "$2a$10$z.r2h5AUgHYCLM3x2qZjZu9vLi19cMEDrbxilf0nIQK0Is9vSxC92"
// WHERE id = 1;

let passwordHasheada = bcryptjs.hashSync('password123', 10);
let password = bcryptjs.compareSync('password123', '$2a$10$ffZfJ9tRmZt5tsSm6cFzLeyIMhjAuLqwRupQczZSa5pDC8JeOHviO');

// aunque se genere otro hash lo mismo es compatible con la constraseña plana
// $2a$10$fDfyQSCMt00FEPyP8caoZ.4op9q.7mvq7tPgu5/qdF2Dh7P.FbYam
// $2a$10$eFXOf8kVsZ6m0RgUVcX9Te.ZsLbM4BZABIFRiQMgH85cJ40kj534C
// $2a$10$ffZfJ9tRmZt5tsSm6cFzLeyIMhjAuLqwRupQczZSa5pDC8JeOHviO

console.log(passwordHasheada);
console.log(password);