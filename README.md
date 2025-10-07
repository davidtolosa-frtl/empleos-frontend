# Portal de Avisos de Empleos - Frontend

Aplicación web frontend desarrollada con React + Vite para la gestión de avisos de empleos. Permite a las empresas publicar ofertas laborales y a los usuarios buscar y filtrar empleos disponibles.

## 🚀 Tecnologías

- **React 19** - Biblioteca de interfaz de usuario
- **Vite 7** - Build tool y dev server ultrarrápido
- **Ant Design 5** - Framework de componentes UI
- **React Router DOM 7** - Enrutamiento de la aplicación
- **Axios** - Cliente HTTP para comunicación con el backend

## 📋 Características

- ✅ Listado de empleos con paginación
- ✅ Búsqueda y filtrado avanzado (ubicación, tipo de empleo, rango salarial)
- ✅ Creación de nuevos avisos de empleo
- ✅ Registro de empresas
- ✅ Sistema de autenticación con login
- ✅ Rutas protegidas para funcionalidades que requieren autenticación
- ✅ Interfaz responsive y moderna con Ant Design

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── empleo/          # Componentes relacionados con empleos
│   │   ├── EmpleoCard.jsx
│   │   ├── EmpleoForm.jsx
│   │   ├── FilterSidebar.jsx
│   │   └── LoadingSpinner.jsx
│   ├── empresa/         # Componentes relacionados con empresas
│   │   └── EmpresaForm.jsx
│   ├── layout/          # Componentes de layout
│   │   └── AppHeader.jsx
│   └── ProtectedRoute.jsx  # HOC para rutas protegidas
├── pages/               # Páginas de la aplicación
│   ├── ListaEmpleos.jsx
│   ├── CrearEmpleo.jsx
│   └── Login.jsx
├── services/            # Servicios y configuración de API
│   ├── api.js
│   └── auth.js          # Funciones de autenticación
├── App.jsx
└── main.jsx
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` basado en `.env.example`
   - Configurar `VITE_API_URL` con la URL del backend (por defecto: `http://localhost:3000/api`)

### Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Vista previa del build de producción
- `npm run lint` - Ejecuta el linter ESLint

## 🔗 Integración con Backend

La aplicación se comunica con el backend a través de Axios. La configuración se encuentra en [src/services/api.js](src/services/api.js).

**Endpoints utilizados:**
- `GET /empleos` - Obtener lista de empleos con filtros
- `POST /empleos` - Crear nuevo empleo
- `POST /empresas` - Registrar nueva empresa
- `POST /auth/login` - Autenticar usuario y obtener token

## 🎨 Componentes Principales

### Páginas
- **ListaEmpleos** - Vista principal con listado, búsqueda y filtros
- **CrearEmpleo** - Formulario para crear empleos y registrar empresas (requiere autenticación)
- **Login** - Página de inicio de sesión

### Componentes
- **EmpleoCard** - Tarjeta que muestra información de cada empleo
- **FilterSidebar** - Sidebar con filtros de búsqueda
- **EmpleoForm** - Formulario de creación de empleos
- **EmpresaForm** - Formulario de registro de empresas
- **AppHeader** - Header de la aplicación con navegación
- **ProtectedRoute** - Componente HOC para proteger rutas que requieren autenticación

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 📝 Notas de Desarrollo

- El proyecto usa ESLint para mantener la calidad del código
- Se utiliza Fast Refresh de Vite para hot reload durante el desarrollo
- Ant Design provee temas y componentes personalizables
- La autenticación se maneja mediante tokens JWT almacenados en localStorage
- Las variables de entorno se cargan con el prefijo `VITE_` para ser accesibles en el cliente

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es parte de un trabajo académico de la UTN.