## Users Management App (Coding Challenge)
Este proyecto es una aplicación de gestión de usuarios desarrollada con React y TypeScript. La aplicación permite la autenticación, gestión de perfiles, estudios y direcciones, conectándose a una API REST externa.

## Stack Tecnológico
Core: React 19 + TypeScript

Estilos: Tailwind CSS + Lucide React (iconos)
Formularios: React Hook Form + Yup (validación)
Comunicación: Axios (con interceptores para JWT)
Navegación: React Router Dom
Notificaciones: React Toastify

## Arquitectura del Proyecto
El proyecto sigue una estructura modular basada en la separación de responsabilidades:

src/api: Configuración de Axios y definiciones de los servicios de la API.
src/context: Manejo del estado global de autenticación.
src/hooks: Hooks personalizados para la lógica de negocio (Profile, Studies, Address, etc.).
src/components: Componentes de interfaz reutilizables.
src/pages: Vistas principales de la aplicación.

## Configuración e Instalación
Clonar el repositorio:

Bash
git clone [<https://github.com/music1991/users-app>]
cd users-app
Instalar dependencias:

Bash
npm install
Variables de Entorno:
Crea un archivo .env.local en la raíz del proyecto y agrega la URL de la API:

Fragmento de código
REACT_APP_BASE_URL_USERS_MANAGEMENT_API=https://localhost:{port}/api


## Iniciar la aplicación:

Bash
npm start