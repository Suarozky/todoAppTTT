# todoAppTTT
Configuración del Backend (todoApp-back) 🛠️
Accede a la carpeta todoApp-back:

bash
--cd todoApp-back
--Configura el archivo .env:
Copia el archivo .env.example y renómbralo a .env.
Ajusta las variables según sea necesario.
Instala las dependencias:
--npm install
Ejecuta las migraciones de la base de datos:
--npm run migration:run
Inicia los servicios de Docker:
--docker-compose up -d
Levanta el servidor en modo desarrollo:
--npm run start:dev

Configuración del Frontend (todoApp-front) 🌐
Accede a la carpeta todoApp-front:


cd todoApp-front
Instala las dependencias (usa la opción --force para resolver posibles conflictos):


npm install --force
Inicia el servidor de desarrollo:
npm run dev
