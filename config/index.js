/* Basic configuration */
const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const BASE_URL = '/api/v1';
app.use(bodyParse.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Desafio Wbrain - API Doc",
      version: "1.0.0",
      description: "Documentação sobre API",
      contact: {
        name: "Carlos Eduardo Lourenço",
        phone: "(21) 98299-1130"
      },
      host: "localhost:3000",
      servers: ["http://localhost:3000"]
    },
    basePath: BASE_URL,

  },
  // ['.routes/*.js']
  apis: ["scr/app.js"]
};

module.exports = {app, BASE_URL, swaggerOptions};