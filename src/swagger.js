const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Arbitros API',
      version: '1.0.0',
      description: 'API para arbitros que consume la API SpringBoot (Entregable 2)'
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
