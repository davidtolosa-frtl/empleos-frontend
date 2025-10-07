# Guía de Aprendizaje React - Portal de Avisos de Empleos

Esta guía está diseñada para estudiantes que están aprendiendo React y quieren entender cómo funciona este proyecto paso a paso.

## 📚 Índice

1. [Conceptos de React utilizados](#conceptos-de-react-utilizados)
2. [Estructura de la aplicación](#estructura-de-la-aplicación)
3. [Análisis de componentes](#análisis-de-componentes)
4. [Flujo de datos](#flujo-de-datos)
5. [Hooks utilizados](#hooks-utilizados)
6. [Rutas y navegación](#rutas-y-navegación)
7. [Comunicación con el backend](#comunicación-con-el-backend)
8. [Ejercicios prácticos](#ejercicios-prácticos)

---

## Conceptos de React utilizados

Este proyecto implementa los siguientes conceptos fundamentales de React:

### ✅ Componentes funcionales
Todos los componentes están escritos como funciones, siguiendo las prácticas modernas de React.

### ✅ Hooks
- `useState` - Para manejar estado local
- `useEffect` - Para efectos secundarios (llamadas a API)
- `useMemo` - Para optimizar cálculos costosos
- `useNavigate` - Para navegación programática

### ✅ Props
Paso de datos entre componentes padre e hijo.

### ✅ Renderizado condicional
Mostrar u ocultar elementos según el estado.

### ✅ Listas y keys
Renderizado dinámico de listas de datos.

### ✅ Formularios controlados
Manejo de inputs con estado de React.

### ✅ Enrutamiento
Navegación entre diferentes páginas con React Router.

---

## Estructura de la aplicación

```
src/
├── App.jsx                    # Componente raíz con las rutas
├── main.jsx                   # Punto de entrada de la aplicación
├── components/                # Componentes reutilizables
│   ├── empleo/
│   │   ├── EmpleoCard.jsx    # Tarjeta individual de empleo
│   │   ├── EmpleoForm.jsx    # Formulario de empleo
│   │   ├── FilterSidebar.jsx # Barra lateral de filtros
│   │   └── LoadingSpinner.jsx
│   ├── empresa/
│   │   └── EmpresaForm.jsx   # Formulario de empresa
│   ├── layout/
│   │   └── AppHeader.jsx     # Encabezado de la app
│   └── ProtectedRoute.jsx    # HOC para rutas protegidas
├── pages/                     # Páginas completas
│   ├── ListaEmpleos.jsx      # Página principal
│   ├── CrearEmpleo.jsx       # Página para crear empleos
│   └── Login.jsx             # Página de login
└── services/                  # Lógica de negocio
    ├── api.js                # Configuración de Axios
    └── auth.js               # Funciones de autenticación
```

---

## Análisis de componentes

### 1. App.jsx - Componente raíz

**Archivo:** [src/App.jsx](src/App.jsx)

```jsx
function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content>
          <Routes>
            <Route path="/" element={<ListaEmpleos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crear" element={
              <ProtectedRoute>
                <CrearEmpleo />
              </ProtectedRoute>
            } />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}
```

**¿Qué hace?**
- Define la estructura principal de la aplicación
- Configura las rutas con `React Router`
- Envuelve toda la app en un `Layout` de Ant Design
- Protege la ruta `/crear` con el componente `ProtectedRoute`

**Conceptos clave:**
- **BrowserRouter (Router)**: Habilita el enrutamiento en la aplicación
- **Routes y Route**: Definen qué componente mostrar según la URL
- **Layout**: Estructura de página de Ant Design

---

### 2. ListaEmpleos.jsx - Página principal

**Archivo:** [src/pages/ListaEmpleos.jsx](src/pages/ListaEmpleos.jsx)

#### Estado del componente

```jsx
const [empleos, setEmpleos] = useState([]);
const [loading, setLoading] = useState(true);
const [filters, setFilters] = useState({
  search: '',
  tipo_contrato: undefined,
  ubicacion: '',
  empresa: '',
  orderBy: 'fecha_desc'
});
```

**Explicación:**
- `empleos`: Array que contiene todos los empleos traídos del backend
- `loading`: Booleano para mostrar spinner mientras carga
- `filters`: Objeto con todos los filtros que el usuario puede aplicar

#### Carga inicial de datos

```jsx
useEffect(() => {
  obtenerEmpleos();
}, []);
```

**¿Qué hace?**
- Se ejecuta UNA SOLA VEZ cuando el componente se monta (array de dependencias vacío `[]`)
- Llama a la función `obtenerEmpleos()` que trae los datos del backend

```jsx
const obtenerEmpleos = async () => {
  try {
    setLoading(true);
    const response = await api.get('/avisos');
    setEmpleos(response.data);
  } catch (error) {
    message.error('Error al cargar los empleos');
  } finally {
    setLoading(false);
  }
};
```

**Flujo:**
1. Pone `loading` en `true` para mostrar spinner
2. Hace una petición GET al backend
3. Guarda los datos en el estado `empleos`
4. Si hay error, muestra un mensaje
5. Siempre pone `loading` en `false` al final

#### Filtrado de datos con useMemo

```jsx
const empleosFiltrados = useMemo(() => {
  let resultado = [...empleos];

  // Filtro por búsqueda
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    resultado = resultado.filter(empleo =>
      empleo.titulo?.toLowerCase().includes(searchLower) ||
      empleo.descripcion?.toLowerCase().includes(searchLower)
    );
  }

  // Filtro por tipo de contrato
  if (filters.tipo_contrato) {
    resultado = resultado.filter(empleo =>
      empleo.tipo_contrato?.toLowerCase() === filters.tipo_contrato.toLowerCase()
    );
  }

  return resultado;
}, [empleos, filters]);
```

**¿Por qué useMemo?**
- El filtrado puede ser una operación costosa con muchos empleos
- `useMemo` guarda el resultado y solo lo recalcula si `empleos` o `filters` cambian
- Mejora el rendimiento evitando cálculos innecesarios

**Conceptos clave:**
- **Array spread (`...`)**: Crea una copia del array
- **filter()**: Método de array que devuelve elementos que cumplen una condición
- **includes()**: Verifica si un string contiene otro
- **Optional chaining (`?.`)**: Evita errores si la propiedad no existe

#### Renderizado

```jsx
<List
  grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
  dataSource={empleosFiltrados}
  renderItem={(empleo) => (
    <List.Item>
      <EmpleoCard empleo={empleo} />
    </List.Item>
  )}
/>
```

**¿Qué hace?**
- Toma el array `empleosFiltrados`
- Por cada empleo, crea un `<EmpleoCard>` pasándole el empleo como prop
- Define un grid responsive (1 columna en móvil, 2-3 en desktop)

---

### 3. EmpleoCard.jsx - Componente de presentación

**Archivo:** [src/components/empleo/EmpleoCard.jsx](src/components/empleo/EmpleoCard.jsx)

```jsx
function EmpleoCard({ empleo }) {
  const formatFecha = (fecha) => {
    if (!fecha) return 'No especificada';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  return (
    <Card
      title={empleo.titulo}
      extra={<Tag color="blue">{empleo.tipo_contrato || 'No especificado'}</Tag>}
      hoverable
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>Empresa: {empleo.empresa_nombre || 'No disponible'}</Text>
        <Paragraph ellipsis={{ rows: 3 }}>
          {empleo.descripcion}
        </Paragraph>
      </Space>
    </Card>
  );
}
```

**Conceptos clave:**
- **Props destructuring**: `{ empleo }` extrae la prop directamente
- **Operador OR (`||`)**: Proporciona un valor por defecto si es nulo
- **Componente puro**: Solo recibe props y renderiza, sin estado propio
- **Función helper**: `formatFecha` es una función local para formatear

---

### 4. Login.jsx - Autenticación

**Archivo:** [src/pages/Login.jsx](src/pages/Login.jsx)

```jsx
function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: values.email,
        password: values.password
      });

      if (response.data.success) {
        login(response.data.data.user, response.data.data.token);
        message.success('Login exitoso');
        navigate('/');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Iniciar Sesión">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingrese su email' },
            { type: 'email', message: 'Ingrese un email válido' }
          ]}
        >
          <Input />
        </Form.Item>
        {/* ... */}
      </Form>
    </Card>
  );
}
```

**Flujo de autenticación:**
1. Usuario completa el formulario
2. Al hacer submit, se ejecuta `onFinish` con los valores
3. Se hace POST al backend con email y password
4. Si es exitoso:
   - Se guarda el token y usuario en localStorage (función `login`)
   - Se redirige a la página principal (`navigate('/')`)
5. Si falla, se muestra un mensaje de error

**Conceptos clave:**
- **useNavigate**: Hook para redirección programática
- **Async/await**: Manejo de promesas de forma síncrona
- **Try/catch**: Manejo de errores
- **Form controlado**: Ant Design maneja el estado del formulario

---

### 5. ProtectedRoute.jsx - HOC de protección

**Archivo:** [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)

```jsx
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

**¿Qué hace?**
- Verifica si el usuario está autenticado
- Si NO está autenticado → Redirige al login
- Si SÍ está autenticado → Muestra el componente hijo

**Uso:**
```jsx
<Route path="/crear" element={
  <ProtectedRoute>
    <CrearEmpleo />
  </ProtectedRoute>
} />
```

**Conceptos clave:**
- **Higher Order Component (HOC)**: Componente que envuelve a otro
- **Renderizado condicional**: Decide qué mostrar según una condición
- **children prop**: Representa los componentes hijos

---

### 6. AppHeader.jsx - Navegación condicional

**Archivo:** [src/components/layout/AppHeader.jsx](src/components/layout/AppHeader.jsx)

```jsx
function AppHeader() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Header>
      <div>
        <div>Empleos UTN</div>
        {isAuthenticated() && (
          <Space>
            <Link to="/">Ver Empleos</Link>
            <Link to="/crear">Publicar Empleo</Link>
          </Space>
        )}
      </div>
      <Space>
        {isAuthenticated() ? (
          <>
            <span>{user?.email}</span>
            <Button onClick={handleLogout}>Cerrar Sesión</Button>
          </>
        ) : (
          <Button onClick={() => navigate('/login')}>
            Ingresar para publicar
          </Button>
        )}
      </Space>
    </Header>
  );
}
```

**Renderizado condicional:**
- Si está autenticado: Muestra links de navegación, email y botón de logout
- Si NO está autenticado: Muestra solo botón de login

**Conceptos clave:**
- **Operador ternario (`? :`)**: Renderizado condicional compacto
- **Fragment (`<>...</>`)**: Agrupa elementos sin crear nodos DOM extra
- **Event handler**: `onClick` ejecuta una función

---

## Flujo de datos

### Ejemplo: Filtrar empleos

```
1. Usuario escribe en el input de búsqueda
   ↓
2. FilterSidebar recibe el evento onChange
   ↓
3. FilterSidebar llama a onFilterChange (prop del padre)
   ↓
4. ListaEmpleos actualiza el estado 'filters'
   ↓
5. useMemo detecta el cambio y recalcula 'empleosFiltrados'
   ↓
6. React re-renderiza la lista con los nuevos datos
```

**Patrón: Lifting State Up**
- El estado `filters` vive en `ListaEmpleos` (componente padre)
- `FilterSidebar` recibe una función callback para actualizar ese estado
- Esto permite que múltiples componentes compartan el mismo estado

---

## Hooks utilizados

### useState

```jsx
const [empleos, setEmpleos] = useState([]);
```

**Cuándo usar:**
- Cuando necesitas que el componente "recuerde" un valor
- Cuando ese valor puede cambiar y debe re-renderizar el componente

**Ejemplos en el proyecto:**
- Lista de empleos
- Estado de carga (loading)
- Filtros aplicados
- Formularios

### useEffect

```jsx
useEffect(() => {
  obtenerEmpleos();
}, []);
```

**Cuándo usar:**
- Llamadas a API
- Suscripciones
- Manipulación del DOM
- Cualquier "efecto secundario"

**Array de dependencias:**
- `[]` → Se ejecuta solo al montar
- `[empleos]` → Se ejecuta al montar y cada vez que `empleos` cambie
- Sin array → Se ejecuta después de cada render (¡peligroso!)

### useMemo

```jsx
const empleosFiltrados = useMemo(() => {
  return empleos.filter(/* ... */);
}, [empleos, filters]);
```

**Cuándo usar:**
- Cálculos costosos que no deben repetirse innecesariamente
- Evitar re-renders de componentes hijos

**Cuándo NO usar:**
- Cálculos simples (más eficiente hacerlos directamente)

### useNavigate

```jsx
const navigate = useNavigate();
navigate('/login');
```

**Cuándo usar:**
- Redirección programática (después de un submit exitoso)
- Navegación condicional

---

## Rutas y navegación

### Configuración de rutas

```jsx
<Routes>
  <Route path="/" element={<ListaEmpleos />} />
  <Route path="/login" element={<Login />} />
  <Route path="/crear" element={<ProtectedRoute><CrearEmpleo /></ProtectedRoute>} />
</Routes>
```

### Navegación declarativa con Link

```jsx
<Link to="/crear">Crear Empleo</Link>
```

### Navegación programática con useNavigate

```jsx
const navigate = useNavigate();
navigate('/');
```

**Diferencia:**
- `Link`: Cuando el usuario hace clic en un enlace
- `navigate()`: Cuando necesitas redirigir después de una acción (login, submit, etc.)

---

## Comunicación con el backend

### Configuración de Axios

**Archivo:** [src/services/api.js](src/services/api.js)

```jsx
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export default api;
```

**Conceptos clave:**
- **Interceptor**: Modifica todas las peticiones antes de enviarlas
- **Bearer token**: Estándar para autenticación con JWT
- **Variables de entorno**: `import.meta.env.VITE_API_URL`

### Ejemplo de petición GET

```jsx
const obtenerEmpleos = async () => {
  const response = await api.get('/avisos');
  setEmpleos(response.data);
};
```

### Ejemplo de petición POST

```jsx
const crearEmpleo = async (datos) => {
  await api.post('/avisos', datos);
};
```

---

## Ejercicios prácticos

### 🎯 Nivel Principiante

1. **Agregar un nuevo filtro**
   - Añade un filtro por salario mínimo en `FilterSidebar`
   - Implementa la lógica de filtrado en `ListaEmpleos`

2. **Mostrar contador de empleos**
   - Muestra cuántos empleos hay en total vs. filtrados
   - Ejemplo: "Mostrando 5 de 20 empleos"

3. **Cambiar el formato de fecha**
   - Modifica `formatFecha` para mostrar fechas relativas
   - Ejemplo: "Hace 2 días", "Hace 1 semana"

### 🎯 Nivel Intermedio

4. **Implementar paginación**
   - Limita a 10 empleos por página
   - Añade botones "Anterior" y "Siguiente"
   - Usa `useState` para trackear la página actual

5. **Guardar filtros en localStorage**
   - Los filtros deben persistir al recargar la página
   - Usa `useEffect` para leer/escribir en localStorage

6. **Agregar modo favoritos**
   - Permite marcar empleos como favoritos
   - Muestra una vista separada con solo favoritos
   - Guarda favoritos en localStorage

### 🎯 Nivel Avanzado

7. **Implementar búsqueda en tiempo real**
   - Usa `debounce` para evitar múltiples búsquedas
   - Busca en el backend en lugar del frontend

8. **Agregar vista de detalle de empleo**
   - Crea una nueva ruta `/empleo/:id`
   - Usa `useParams` para obtener el ID
   - Muestra toda la información del empleo

9. **Optimizar re-renders**
   - Usa `React.memo` en componentes que no deben re-renderizarse
   - Implementa `useCallback` para funciones pasadas como props

---

## Recursos adicionales

### Documentación oficial
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Ant Design](https://ant.design/)
- [Axios](https://axios-http.com/)

### Conceptos para profundizar
- **Context API**: Para estado global sin pasar props
- **Custom Hooks**: Reutilizar lógica entre componentes
- **Error Boundaries**: Manejo de errores en componentes
- **Code Splitting**: Cargar código solo cuando se necesita
- **Testing**: Jest y React Testing Library

---

## Conclusión

Este proyecto implementa un flujo completo de aplicación React moderna:

1. **Componentes reutilizables** organizados por funcionalidad
2. **Manejo de estado** con hooks
3. **Comunicación con API** REST
4. **Autenticación** con JWT
5. **Rutas protegidas** y navegación
6. **Optimizaciones** de rendimiento

Experimenta modificando el código, agregando features nuevas y leyendo la documentación oficial para profundizar tu conocimiento.

¡Éxitos en tu aprendizaje de React! 🚀
