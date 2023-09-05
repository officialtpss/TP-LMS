import JWTAuthenticator from '@/common/middlewares/jwt.validator';
import validator from '@/common/middlewares/schema.validator';
import UserAuthenticator from '@/common/middlewares/UserAuthenticator';
import AdminController from '@/controllers/admin/AdminController';
import AppController from '@/controllers/admin/AppController';
import { Router } from 'express';
import Joi from 'joi';

const path = '/admin';
const AdminRouter = Router({ mergeParams: true });
const adminIdSchema = {
    adminId: Joi.string().required()
};

/**
 * @swagger
 * definitions:
 *   admin:
 *     type: object
 *     required: 
 *       - password
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         example: 'admin@isop.com'
 *       password:
 *         type: string
 *         example: 'U2FsdGVkX1+XxpO5ZQklb63XpTyrwqRcYD9jLgBcyiM='
 *       firstName:
 *         type: string
 *         example: 'John'
 *       lastName:
 *         type: string
 *         example: 'Cena'
 */

/**
 * @swagger
 * /admin/{adminId}:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin.
 *     description: Get specific admin .
 *     operationId: getOne
 *     parameters:
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *           example: 5f60b26b692cf083f81e3bde
 *         required: true
 *         description: To get a single user by using its ID.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/definitions/admin'
 *                  message:
 *                      type: string
 *                      example: user retrieved successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
AdminRouter.get(`${path}/:adminId`, validator(adminIdSchema), JWTAuthenticator.decode, AdminController.getOne);



/**
 * @swagger
 * /admin:
 *   put:
 *     tags: [Admin]
 *     summary:  Admin login.
 *     description: Admin login.
 *     operationId: login
 *     parameters:
 *      - name: Body
 *        description:  The request body contains an event
 *        in: body
 *        required: true
 *        schema:
 *         $ref: '#/definitions/singIn'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *              schema:
 *               type: object
 *               properties:
 *                data: 
 *                  type: object
 *                  example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', profile: { firstName: 'first', lastName: 'last' } }
 *                message:
 *                  type: string
 *                  example: 'Login successfully'
 *               success:
 *                  type: boolean
 *                  example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
const userLoginSchema = {
    password: Joi.string().required(),
    email: Joi.string().required()
};
AdminRouter.put(`${path}`, validator(userLoginSchema), AdminController.login, JWTAuthenticator.encode);


const adminSchema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
};
AdminRouter.post(`${path}/create-admin`, validator(adminSchema), AdminController.checkEmailExistOrNot, AdminController.create);


/**
 * @swagger
 * definitions:
 *   updateAdmin:
 *     type: object
 *     properties: 
 *       password:
 *         type: string
 *         example: 'U2FsdGVkX1+XxpO5ZQklb63XpTyrwqRcYD9jLgBcyiM='
 */

/**
 * @swagger
 * /admin/{adminId}:
 *   patch:
 *     tags: [Admin]
 *     summary: Update admin password.
 *     description: Edit specific admin.
 *     operationId: update
 *     parameters:
 *       - name: Body
 *         description:  The request body contains an event
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateAdmin'
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *       - in: path
 *         name: adminId
 *         schema:
 *           type: string
 *           example: 5f60b26b692cf083f81e3bde
 *         required: true
 *         description: Id of user to update
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/definitions/admin'
 *                 message:
 *                   type: string
 *                   example: user updated successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
const admniUpdateSchema = {
    adminId: Joi.string().required(),
    password: Joi.string().required()
};
AdminRouter.patch(`${path}/:adminId`, validator(admniUpdateSchema), JWTAuthenticator.decode, AdminController.update);


// APP CONTROLLER  ROUTES

const appCreateSchema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    role: Joi.string().required()
};

AdminRouter.post(`/app`, UserAuthenticator.isSystemAdminAuthenticated, validator(appCreateSchema),AppController.create)

AdminRouter.get(`/app`, UserAuthenticator.isSystemAdminAuthenticated, AppController.getAll)

AdminRouter.get('/app/:appId', UserAuthenticator.isSystemAdminAuthenticated, AppController.getOne)



export default AdminRouter;
