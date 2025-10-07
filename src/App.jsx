import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ListaEmpleos from './pages/ListaEmpleos';
import CrearEmpleo from './pages/CrearEmpleo';
import Login from './pages/Login';
import AppHeader from './components/layout/AppHeader';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />

        <Content>
          <Routes>
            <Route path="/" element={<ListaEmpleos />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/crear"
              element={
                <ProtectedRoute>
                  <CrearEmpleo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
