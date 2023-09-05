import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { SERVER_URL, SWAGGER_APP_NAME, SWAGGER_CONTACT_MAIL, SWAGGER_DESC, SWAGGER_VERSION } from '@config/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import * as swaggerValidator from 'swagger-model-validator';

const router = express.Router();
const swaggerDefinition = {
    info: {
        title: SWAGGER_APP_NAME,
        version: SWAGGER_VERSION,
        description: SWAGGER_DESC,
        contact: {
            email: SWAGGER_CONTACT_MAIL,
        },
    },
    produces: [
        'application/json',
    ],
    schemes: ['http', 'https'],
    host: SERVER_URL,
    basePath: '/',
    components: {
        schemas: {
            '200': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: ''
                    },
                    success: {
                        type: 'boolean',
                        example: true
                    },
                },
            },
            '500': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Server Not Responding.'
                    },
                },
            },
            '404': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Record not found.'
                    },
                },
            },
            '400': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: ''
                    },
                    success: {
                        type: 'boolean',
                        example: false
                    },
                },
            },
            '401': {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'User Unauthenticated.'
                    },
                },
            },
        },
        securitySchemes: {
            jwt_api_auth: {
                type: 'http',
                scheme: 'bearer',
            },
        },
    }
};

const swaggerSpec: ILooseObject = {
    swaggerDefinition,
    apis: ['./app/routes/*.ts', './app/routes/admin/*.ts'],
};
const openapiSpecification = swaggerJsdoc(swaggerSpec);


router.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
const getdata = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}
const validateModel = (name, model) => {
    var validator = new swaggerValidator.Handler(openapiSpecification);
    const responseValidation = validator.validateModel(name, model, false, true);
    if (!responseValidation.valid) {
        console.error(responseValidation.errors);
        throw new Error('Model doesn\'t match Swagger contract');
    }
}
export default {
    router,
    validateModel,
    getdata
};
