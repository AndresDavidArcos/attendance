#Parcial 1 de base de datos 18/01/2022

En este parcial se realizo una herramienta para controlar la asistencia a un campus universitario de los estudiantes y de los profesores.

La herramienta hace uso de una base de datos. Para tener la base de datos en su computadora debera descargar postgres y en la consola de comandos de postgres o el windows powershell acceder al cliente de postgres con el comando:
```
psql -U postgres;
```
Luego debera crear una base de datos y acceder a ella; el nombre predeterminado de la base de datos es attendancebd. El comando para esto sera:
```
CREATE DATABASE attendancebd;
\c attendancebd;
```
Una vez dentro se pegara todo el codigo que se encuentra en el archivo:
* [Codigo_generador_bd](database.sql)

NOTA: En el archivo
* [Configuracion_bd](src/database.js)

Se encontraran las configuraciones predeterminadas de la base de datos, las cuales tienen por puerto el 5432, por usuario postgres y por contraseña: kamarex2002; porfavor ajuste esas configuraciones a su postgres local. 

Para que el proyecto funcione correctamente debera instalar todas sus dependencias. Para hacer esto debera poner el comando: 
```
npm install
```
tanto en el directorio attendance como en el directorio client, pues ambos tienen su propio json con sus propias dependencias. 

La herramienta esta dividida en dos partes, el servidor backend y el servidor frontend; para iniciar el backend ejecute en una consola situandose en attendance el comando:
```
npm run dev
```
Y para ejecutar el cliente que abrira la pagina con la herramienta ejecute:
```
npm run start
```