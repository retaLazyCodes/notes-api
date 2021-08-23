const swaggerJsDoc = require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            version: "version 0.0.1",
            title: "Notes API",
            description: "Notes API Information",
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'token',
                scheme: 'bearer',
                in: 'header',
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs