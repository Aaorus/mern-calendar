/* 
    Rutas de Usuarios / Auth 
    host + /api/auth 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// new
router.post('/new', 
[
//   middlewares
check('name', 'El nombre es obligatorio').not().isEmpty(),
check('email', 'El email es obligatorio').isEmail(),
check('password', 'El password debe de ser +6 caracteres').isLength({min: 6}), validarCampos
], 
crearUsuario );

// login
router.post('/', 
// middlewares
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser +6 caracteres').isLength({min: 6}), validarCampos
],
loginUsuario );

// renew token
router.get('/renew', validarJWT, revalidarToken );


module.exports = router;