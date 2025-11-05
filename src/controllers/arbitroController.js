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

// Endpoint que devuelve árbitros con URLs de imagen construidas desde los seeds y `awsS3` helper
const seed = require('../../seeds/arbitros.json');
const { publicUrlForKey } = require('../config/awsS3');

exports.listWithImages = async (req, res) => {
  try {
    // Simulación de árbitros con imágenes desde S3
    const arbitros = [
      {
        id: 1,
        nombre: "Juan Pérez",
        imagen: "https://bucketarbitros.s3.amazonaws.com/arbitro1.jpg"
      },
      {
        id: 2,
        nombre: "María García",
        imagen: "https://bucketarbitros.s3.amazonaws.com/arbitro2.jpg"
      },
      {
        id: 3,
        nombre: "Carlos López",
        imagen: "https://bucketarbitros.s3.amazonaws.com/arbitro3.jpg"
      }
    ];

    // Obtener el ID del contenedor (hostname)
    const containerId = os.hostname();

    res.json({
      containerId: containerId,
      timestamp: new Date().toISOString(),
      arbitros: arbitros
    });
  } catch (err) {
    console.error('ERROR:', err);
    res.status(500).json({ error: 'server error', detail: err.message, stack: err.stack });
  }
};
