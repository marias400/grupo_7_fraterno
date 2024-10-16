# Base de datos: Guia

-- **Creación**
1.  Ejecutar el script que se encuentra en ./sql/**fraternoDB.sql** para crear la base de datos con sus correspondientes tablas y relaciones (users, products, cart).
2.   Ejecutar el script que se encuentra en ./sql/**datosFraternos.sql** para agregar datos de ejemplo a la base de datos (**importante para ver imágenes**).

-- **Testing**
1. Login

Se puede utilizar cualquier usuario creado por el script **datosFraternos.sql** como por ejemplo para testear como admin:

	 - email: mateo.diaz@example.com
	 - contraseña: password123
	
El **CRUD** está únicamente disponible para los usuarios admin, así que si se desean manipular datos hay que loguear como tal.

O para ingresar como un usuario regular:

	- email: lucas.pereira@example.com
	- contraseña: password789

2. Logout

Simplemente, dirigirse al nombre del usuario que figura en la esquina superior derecha y usar el botón **Cerrar sesión**