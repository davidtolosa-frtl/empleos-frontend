import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';

const { Header } = Layout;

function AppHeader() {
  return (
    <Header>
      <div style={{ color: 'white', fontSize: '20px', float: 'left', marginRight: '50px' }}>
        Empleos UTN
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
          <Link to="/">Ver Empleos</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
          <Link to="/crear">Publicar Empleo</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;