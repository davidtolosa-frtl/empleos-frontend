import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ListaEmpleos from './pages/ListaEmpleos';
import CrearEmpleo from './pages/CrearEmpleo';
import AppHeader from './components/layout/AppHeader';
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
            <Route path="/crear" element={<CrearEmpleo />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
