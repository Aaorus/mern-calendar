/* 
    Event Routes 
    /api/events
*/

// Importaciones
const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, ActualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require('../helpers/isDate');
const router = Router();

// cualquier peticion que este debajo de esto pasara por este  middleware
router.use( validarJWT);

// Todas tienen que pasar por la validacion del JWT
// obtener eventos
router.get('/', getEventos)
// crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        // check('', '').not().isEmpty(),
        validarCampos,
    ], crearEvento)
// actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        // check('', '').not().isEmpty(),
        validarCampos,
    ], ActualizarEvento)
// Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;