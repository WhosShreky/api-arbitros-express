const express = require('express');
const router = express.Router();
const arbitroController = require('../controllers/arbitroController');

// List all arbitros
router.get('/', arbitroController.list);
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
