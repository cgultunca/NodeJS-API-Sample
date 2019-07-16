const AuthorizationController = require('../../controllers/authorization.controller');
const AuthenticationMiddleware = require('..//middlewares/authentication.middleware');
const UsersController = require('../../controllers/user.controller');
const PermissionMiddleware = require('../middlewares/permission.middleware');
const config = require('./env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {

    app.post('/auth', [
        AuthenticationMiddleware.hasAuthValidFields,
        AuthenticationMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthenticationMiddleware.validJWTNeeded,
        AuthenticationMiddleware.verifyRefreshBodyField,
        AuthenticationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        AuthenticationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        AuthenticationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        AuthenticationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        AuthenticationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};