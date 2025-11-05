const express = require('express');
const router = express.Router();
const arbitroController = require('../controllers/arbitroController');

// List all arbitros
router.get('/', arbitroController.list);
// Simula arbitros con imágenes (S3) — poner antes de '/:id' para que no choque con el parámetro
router.get('/con-imagenes', arbitroController.listWithImages);
// Get single arbitro
router.get('/:id', arbitroController.getById);
// Dashboard for arbitro
router.get('/:id/dashboard', arbitroController.dashboard);
// Matches
router.get('/:id/partidos', arbitroController.partidos);
// Assignments
router.get('/:id/asignaciones', arbitroController.asignaciones);
// Liquidaciones
router.get('/:id/liquidaciones', arbitroController.liquidaciones);

module.exports = router;
