# SeguridadDeLaInformacion
Tarea 2 Primer Bimestre

Para que la aplicación web funcione se necesita instalar primero NodeJS

Una vez instalado, se deberán correr las siguientes líneas en una consola y dentro de la carpeta para alojar la aplicación

npm init --yes

npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local connect-flash express-validator

npm i nodemon -D


Ahora deberemos agregar en el archivo package.json, en scripts la siguiente linea:

"dev": "nodemon src/"


Luego deberemos correr XAMPP y habilitar Apache y MySQL

En una terminal escribimos lo siguiente:

mysql -u root -p

Nos pedirá nuestra contraseña

Luego correremos todas las sentencias que estan en database/db.sql


Después en una terminal escribiremos:

npm run dev


Finalmente en la barra de dirección de un navegador escribimos:

Localhost:4000


Y tendremos nuestra aplicación web funcionando
