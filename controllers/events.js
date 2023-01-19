const { response } = require('express');
const Evento = require('../models/Evento')


const getEventos = async (req, res = response) => {

     const eventos = await Evento.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        eventos,
    })
}
const crearEvento = async (req, res = response) => {

    // verificar que tenga el evento
    const evento = new Evento( req.body );


    // grabar el evento
    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

    res.json({
        ok: true,
        msg: 'crearEvento'
    })
}
const ActualizarEvento = async (req, res = response) => {
    // capturar primero el id que llega por la url
    const eventoId = req.params.id
    const uid = req.uid;

    try {
        // verificar si el id existe
        const evento = await Evento.findById( eventoId )

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg:'Evento no existe por ese id'
            });
        }


        // actualizar eventos que solo el mismo usuario ha creado, validando si el id del evento es el mismo que el del usuario.
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({ //401 es cuando no hay privilegios para editar
                ok: false,
                msg: 'no tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} ) //el new en true, me retorna la version actualizada del doc.
        
        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}



const eliminarEvento = async (req, res = response) => {
// capturar primero el id que llega por la url
    // capturar primero el id que llega por la url
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        // verificar si el id existe
        const evento = await Evento.findById( eventoId );



        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId ); 

        res.json({ ok: true });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = { getEventos, crearEvento, ActualizarEvento, eliminarEvento };