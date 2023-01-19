const { Schema, model } = require('mongoose');

// definir como queremos que lusca el esquema
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = model('Usuario', UsuarioSchema);