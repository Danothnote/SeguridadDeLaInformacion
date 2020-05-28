DROP TABLE IF EXISTS `Rol_Funcionalidades`;
DROP TABLE IF EXISTS `RolUsuario`;
DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios`(
	`id_usuario` int(4) NOT NULL,
	`usuario` varchar(30) NOT NULL,
	`clave` varchar(60) NOT NULL, PRIMARY KEY (`id_usuario`));
ALTER TABLE Usuarios MODIFY id_usuario INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
    
DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles`(
	`Id_rol` int(4) NOT NULL,
	`rol` varchar(13) NOT NULL, PRIMARY KEY (`Id_rol`));
    
DROP TABLE IF EXISTS `RolUsuario`;
CREATE TABLE `RolUsuario`(
	`id_rolusuario` int(4) NOT NULL,
	`id_usuario` int(4) NOT NULL,
	`id_rol` int(4) NOT NULL, PRIMARY KEY (`id_rolusuario`),
		KEY `id_usuario` (`id_usuario`),
		CONSTRAINT `RolUsuario_Fk1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`),
		KEY `id_rol` (`id_rol`),
		CONSTRAINT `RolUsuario_Fk2` FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`id_rol`));
ALTER TABLE RolUsuario MODIFY id_rolusuario INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
        
DROP TABLE IF EXISTS `Funcionalidades`;
CREATE TABLE `Funcionalidades` (
	`id_funcionalidad` int(4) NOT NULL,
	`funcionalidad` varchar(40), PRIMARY KEY (`id_funcionalidad`));
    
DROP TABLE IF EXISTS `Rol_Funcionalidades`;
CREATE TABLE `Rol_Funcionalidades` (
	`Id_RolFuncionalidad` int(4) NOT NULL,
	`Id_RolUsuario` int(4) NOT NULL,
	`id_funcionalidad` int(4) NOT NULL, PRIMARY KEY (`Id_RolFuncionalidad`),
		KEY `id_RolUsuario` (`id_RolUsuario`),
			CONSTRAINT `RolFuncionalidad_Fk1` FOREIGN KEY (`id_RolUsuario`) REFERENCES `Roles` (`Id_rol`),
		KEY `id_funcionalidad` (`id_funcionalidad`),
			CONSTRAINT `RolFuncionalidad_Fk2` FOREIGN KEY (`id_funcionalidad`) REFERENCES `Funcionalidades` (`id_funcionalidad`));
ALTER TABLE Rol_Funcionalidades MODIFY Id_RolFuncionalidad INT(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

INSERT INTO `Roles` VALUES (1, 'estudiante');
INSERT INTO `Roles` VALUES (2, 'secretaria');
INSERT INTO `Roles` VALUES (3, 'docente');
INSERT INTO `Roles` VALUES (4, 'administrador');
INSERT INTO `Funcionalidades` VALUES (1, 'IngresoNotas');
INSERT INTO `Funcionalidades` VALUES (2, 'ConsultaNotas');
INSERT INTO `Funcionalidades` VALUES (3, 'ModificarNotas');
INSERT INTO `Funcionalidades` VALUES (4, 'RegistrarExpediente');
INSERT INTO `Funcionalidades` VALUES (5, 'VerPagos');
INSERT INTO `Funcionalidades` VALUES (6, 'ConsultarExpediente');
INSERT INTO `Funcionalidades` VALUES (7, 'Modificar roles y funciones de usuarios');
INSERT INTO `Rol_Funcionalidades` VALUES (1, 4, 7);