const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

router.get('/signup', isNotLoggedIn, async (req, res) => {
    const roles = await pool.query('SELECT * FROM Roles')
    res.render('auth/signup', { roles });
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', async (req, res) => {
    var roluser = await pool.query('SELECT rol FROM Usuarios, Roles, rolUsuario WHERE Usuarios.id_usuario = RolUsuario.id_rolusuario AND RolUsuario.id_rol = Roles.id_rol AND Usuarios.id_usuario = ?', [req.user.id_usuario]);
    const funcionalidades = await pool.query('SELECT funcionalidad FROM Usuarios, rolUsuario, Funcionalidades, Rol_Funcionalidades WHERE Rol_Funcionalidades.id_funcionalidad = Funcionalidades.id_funcionalidad AND Rol_Funcionalidades.Id_RolUsuario = RolUsuario.id_rol AND RolUsuario.id_RolUsuario = Usuarios.id_usuario AND Usuarios.id_usuario = ?', [req.user.id_usuario]);
    var administrador = false;
    console.log(roluser[0].rol)
    if (roluser[0].rol == 'administrador') {
        administrador = true;
    }
    console.log(funcionalidades);
    res.render('profile', { roluser, funcionalidades, administrador });
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;