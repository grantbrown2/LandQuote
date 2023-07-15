const UserController = require('../controllers/user.controller');
const QuoteController = require('../controllers/quote.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');
const { get } = require('mongoose');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/users/register', UserController.createUser);
    app.post('/api/users/login', UserController.loginUser);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users/all', authenticate, getIdFromCookie, UserController.findAllUsers);
    app.get('/api/users/self', authenticate, getIdFromCookie, UserController.findUserById);
    app.get('/api/users/:username', authenticate, getIdFromCookie, UserController.findUserByName);
    app.patch('/api/users/update', authenticate, getIdFromCookie, UserController.updateUser);
    app.delete('/api/users/delete', authenticate, getIdFromCookie, UserController.deleteUser);
    
    app.post('/api/quote/submit', QuoteController.submit);
}