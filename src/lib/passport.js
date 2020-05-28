const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helper');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(clave, user.clave);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.usuario));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario, clave, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
    if (rows.length > 0) {
        return done(null, false, req.flash('message', 'El usuario ya existe'));
    } else {
        const { rols } = req.body;
        const newUser = {
            usuario,
            clave
        };
        newUser.clave = await helpers.encryptPassword(clave);
        const result = await pool.query('INSERT INTO Usuarios SET ?', [newUser]);
        var id_rol = 0;
        var id_rolusuario = 0;
        if (rols == 'estudiante') {
            id_rol = 1;
            id_rolusuario = 1;
        }
        if (rols == 'secretaria') {
            id_rol = 2;
            id_rolusuario = 2;
        }
        if (rols == 'docente') {
            id_rol = 3;
            id_rolusuario = 3;
        }
        if (rols == 'administrador') {
            id_rol = 4;
            id_rolusuario = 4;
        }
        const rolusuario = {
            id_usuario: result.insertId,
            id_rol
        }
        await pool.query('INSERT INTO RolUsuario SET ?', [rolusuario]);
        newUser.id_usuario = result.insertId;
        newUser.id_RolFuncionalidad = result.insertId;
        return done(null, newUser);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id_usuario, done) => {
    const rows = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
    done(null, rows[0]);
});