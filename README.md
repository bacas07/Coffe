# ☕ COFFE STORE

## 📝 Descripción: 
**Coffe store** es una aplicación backend basada en Node.js diseñada para gestionar las operaciones de una cafetería Cafe Coronado. Este proyecto utiliza Express.jspara el enrutamiento, Mongoose para las interacciones con MongoDB y Argon2 para el hashing de contraseñas. La aplicación incluye mecanismos de autenticación y autorización de usuarios para garantizar el acceso seguro a los recursos.

## 📑 Tabla de Contenidos:

- [📥 Instalación](#📥-instalación)
- [🚀 Uso](#🚀-uso)
- [🌐 Rutas](#🌐-rutas)
  - [☕ Rutas de Cafés](#☕-rutas-de-cafés)
  - [👥 Rutas de Usuarios](#👥-rutas-de-usuarios)
- [🔒 Seguridad](#🔒-seguridad)
- [🤝 Contribución](#🤝-contribución)


## 📥 Instalación:

1. Clona el repositorio: git clone https://github.com/bacas07/Caffe.git

2. Navega al directorio del proyecto: cd Caffe

3. Instala las dependencias: npm install

4. Crea un archivo .env en el directorio raíz y agrega las siguientes variables de entorno:

    - `PORT=3000`
    - `JWT_TOKEN_SECRET=your_jwt_token_secret`
    - `MONGO_URL=your_mongo_database_url`
    - `ADMIN_SECRECT_KEY=your_password_to_create_admins_users`
    - `API_KEY=your_admin_key_for_conect`

## 🚀 Uso: 
Inicia el servidor: npm start El servidor se ejecutará en http://localhost:3000.

### 🌐 Rutas:

#### ☕ Rutas de Cafés:

##### GET /coffees:
Recupera todos los elementos de café. 
- Middleware: ``verifyApiKey``
- Controlador: ``coffeeController.findAll``

##### GET /coffees/:id:
Recupera un elemento de café por ID. 
- Middleware: ``verifyApiKey``, ``verifyToken``, ``permit('user', 'admin')`` 
- Controlador: ``coffeeController.findById``

##### POST /coffees: 
Crea un nuevo elemento de café. 
- Middleware: ``verifyApiKey``, ``verifyToken``, ``permit('admin')`` 
- Controlador: ``coffeeController.create``

##### PUT /coffees/:id: 
Actualiza un elemento de café por ID. 
- Middleware: ``verifyApiKey``, ``verifyToken``, ``permit('admin')`` 
- Controlador: ``coffeeController.updateById``

##### DELETE /coffees/:id: 
Elimina un elemento de café por ID. 
- Middleware: ``verifyApiKey``, ``verifyToken``, ``permit('admin')`` 
- Controlador: ``coffeeController.deleteById``

#### 👥 Rutas de Usuarios:

##### POST /users/register: 
Registra un nuevo usuario. 
- Middleware: ``verifyApiKey`` 
- Controlador: ``userController.register``

##### POST /users/login: 
Inicia sesión de usuario. 
- Middleware: ``verifyApiKey`` 
- Controlador: ``userController.login``

##### DELETE /users/:id: 
Elimina un usuario por ID. 
- Middleware: ``verifyApiKey``, ``verifyToken``, ``permit('admin')`` 
- Controlador: ``userController.deleteById``

## 🔒 Seguridad: 
La aplicación implementa varias medidas de seguridad:

- **Verificación de API Key**: 
Asegura que solo clientes autorizados puedan acceder a la API.

- **Autenticación JWT**: Utiliza JSON Web Tokens para autenticar usuarios y proteger rutas.

- **Control de Acceso Basado en Roles**: Restringe el acceso a ciertas rutas según los roles de usuario (user, admin).

- **Hashing de Contraseñas**: Usa Argon2 para hashear contraseñas de usuarios de forma segura antes de almacenarlas en la base de datos.

## 🤝 Contribución: 
Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request.

