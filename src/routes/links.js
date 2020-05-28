const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {
    const funcEstudiante = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades, Roles, Rol_Funcionalidades WHERE Roles.Id_rol = Rol_Funcionalidades.id_RolUsuario AND Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Roles.id_rol = 1');
    const funcSecretario = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades, Roles, Rol_Funcionalidades WHERE Roles.Id_rol = Rol_Funcionalidades.id_RolUsuario AND Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Roles.id_rol = 2');
    const funcDocente = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades, Roles, Rol_Funcionalidades WHERE Roles.Id_rol = Rol_Funcionalidades.id_RolUsuario AND Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Roles.id_rol = 3');
    const nofuncEstudiante = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades WHERE NOT EXISTS (SELECT id_funcionalidad FROM Rol_Funcionalidades WHERE Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Rol_Funcionalidades.id_RolUsuario = 1) AND Funcionalidades.id_funcionalidad <> 7');
    const nofuncSecretario = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades WHERE NOT EXISTS (SELECT id_funcionalidad FROM Rol_Funcionalidades WHERE Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Rol_Funcionalidades.id_RolUsuario = 2) AND Funcionalidades.id_funcionalidad <> 7');
    const nofuncDocente = await pool.query('SELECT funcionalidad, Funcionalidades.id_funcionalidad FROM Funcionalidades WHERE NOT EXISTS (SELECT id_funcionalidad FROM Rol_Funcionalidades WHERE Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Rol_Funcionalidades.id_RolUsuario = 3) AND Funcionalidades.id_funcionalidad <> 7');
    const roluser = await pool.query('SELECT usuario, rol, Usuarios.id_usuario FROM Usuarios, Roles, rolUsuario WHERE Usuarios.id_usuario = RolUsuario.id_rolusuario AND RolUsuario.id_rol = Roles.id_rol ORDER BY Usuarios.id_usuario ASC');
    const listarol = await pool.query('SELECT rol, id_rol from Roles');
    res.render('links/list', { funcEstudiante, funcSecretario, funcDocente, roluser, listarol, nofuncEstudiante, nofuncSecretario, nofuncDocente });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const func = req.body;
    if (func.checked) {
        for (i = 0; i < func.checked.length; i++) {
            await pool.query('DELETE FROM Rol_Funcionalidades WHERE id_RolUsuario = ? AND id_funcionalidad = ?;', [id, func.checked[i]]);
        }
    }
    if (func.unchecked) {
        for (i = 0; i < func.unchecked.length; i++) {
            await pool.query('INSERT INTO Rol_Funcionalidades (id_RolUsuario, id_funcionalidad) VALUES (?, ?)', [id, func.unchecked[i]]);
        }
    }
    if (req.body['radius'] == 1) {
        await pool.query('UPDATE RolUsuario set Id_rol = 1 WHERE id_usuario = ?', [id]);
    }
    if (req.body['radius'] == 2) {
        await pool.query('UPDATE RolUsuario set Id_rol = 2 WHERE id_usuario = ?', [id]);
    }
    if (req.body['radius'] == 3) {
        await pool.query('UPDATE RolUsuario set Id_rol = 3 WHERE id_usuario = ?', [id]);
    }
    if (req.body['radius'] == 4) {
        await pool.query('UPDATE RolUsuario set Id_rol = 4 WHERE id_usuario = ?', [id]);
    }
    req.flash('success', 'Editado satisfactoriamente');
    res.redirect('/links');
});

router.post('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM RolUsuario WHERE id_usuario = ?', [id]);
    await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
    req.flash('success', 'Usuario removido satisfactoriamente');
    res.redirect('/links');
});

module.exports = router;