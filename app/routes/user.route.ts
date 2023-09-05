import JWTAuthenticator from '@/common/middlewares/jwt.validator';
import validator from '@/common/middlewares/schema.validator';
import UserAuthenticator from '@/common/middlewares/UserAuthenticator';
import UserController from '@controllers/UserController';
import { Router } from 'express';
import Joi from 'joi';

const path = '/user';
const userRouter = Router({ mergeParams: true });
const userIdSchema = {
    userId: Joi.string().required()
};

/**
 * @swagger
 * definitions:
 *   user:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - password
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         example: 'info@isop.com'
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
 * /user/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Get user.
 *     description: Get specific user .
 *     operationId: getOne
 *     parameters:
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *       - in: path
 *         name: userId
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
 *                      $ref: '#/definitions/user'
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
userRouter.get(`${path}/:userId`, validator(userIdSchema), JWTAuthenticator.decode, UserController.getOne);


/**
 * @swagger
 * definitions:
 *   singIn:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         example: 'info@isop.com'
 *       password:
 *         type: string
 *         example: 'U2FsdGVkX1+XxpO5ZQklb63XpTyrwqRcYD9jLgBcyiM='
 */



/**
 * @swagger
 * /user:
 *   put:
 *     tags: [User]
 *     summary:  User login.
 *     description: user login.
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
userRouter.put(`${path}`, validator(userLoginSchema), UserController.login, JWTAuthenticator.encode);


/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     summary: Create user.
 *     description: Create user.
 *     operationId: create
 *     parameters:
 *       - name: Body
 *         description:  The request body contains an event
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
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
 *                   $ref: '#/components/schemas/200'
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
const userSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
};
userRouter.post(`${path}`, UserAuthenticator.isSystemAdminAuthenticated, validator(userSchema), UserController.checkEmailExistOrNot, UserController.create);


/**
 * @swagger
 * definitions:
 *   updateUser:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         example: 'firstname'
 *       lastName:
 *         type: string
 *         example: 'lastName'
 *       password:
 *         type: string
 *         example: 'U2FsdGVkX1+XxpO5ZQklb63XpTyrwqRcYD9jLgBcyiM='
 */

/**
 * @swagger
 * /user/{userId}:
 *   patch:
 *     tags: [User]
 *     summary: Edit user.
 *     description: Edit specific user.
 *     operationId: update
 *     parameters:
 *       - name: Body
 *         description:  The request body contains an event
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/updateUser'
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *       - in: path
 *         name: userId
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
 *                   $ref: '#/definitions/user'
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
const userUpdateSchema = {
    userId: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    password: Joi.string().optional()
};
userRouter.patch(`${path}/:userId`, validator(userUpdateSchema), JWTAuthenticator.decode, UserController.update);



userRouter.get(`${path}`, UserAuthenticator.isSystemAdminAuthenticated, JWTAuthenticator.decode, UserController.getAll);


export default userRouter;
