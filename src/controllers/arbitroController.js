const arbitroService = require('../services/arbitroService');
const os = require('os');

exports.list = async (req, res) => {
  try {
    const data = await arbitroService.listAll();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const a = await arbitroService.getById(id);
    if (!a) return res.status(404).json({ error: 'not found' });
    res.json(a);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getDashboard(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.partidos = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getPartidos(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.asignaciones = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getAsignaciones(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.liquidaciones = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await arbitroService.getLiquidaciones(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// Endpoint de ejemplo que devuelve árbitros con imágenes (simulado desde S3)
exports.listWithImages = async (req, res) => {
  try {
    const arbitros = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        imagen: 'https://arbitros-imagenes-fredy.s3.amazonaws.com/arbitro1.jpg'
      },
      {
        id: 2,
        nombre: 'María García',
        imagen: 'https://arbitros-imagenes-fredy.s3.amazonaws.com/arbitro2.jpg'
      },
      {
        id: 3,
        nombre: 'Carlos López',
        imagen: 'https://arbitros-imagenes-fredy.s3.amazonaws.com/arbitro3.jpg'
      }
    ];

    const containerId = os.hostname();

    res.json({ containerId, timestamp: new Date().toISOString(), arbitros });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};
