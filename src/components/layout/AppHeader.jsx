import { Layout, Button, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, PlusOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { getUser, logout, isAuthenticated } from '../../services/auth';

const { Header } = Layout;

function AppHeader() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ color: 'white', fontSize: '20px' }}>
          Empleos UTN
        </div>
        {isAuthenticated() && (
          <Space size="middle">
            <Link to="/" style={{ color: 'white' }}>
              <UnorderedListOutlined /> Ver Empleos
            </Link>
            <Link to="/crear" style={{ color: 'white' }}>
              <PlusOutlined /> Publicar Empleo
            </Link>
          </Space>
        )}
      </div>
      <Space>
        {isAuthenticated() ? (
          <>
            <span style={{ color: 'white' }}>{user?.email}</span>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Button icon={<LoginOutlined />} onClick={() => navigate('/login')}>
            Ingresar para publicar
          </Button>
        )}
      </Space>
    </Header>
  );
}

export default AppHeader;