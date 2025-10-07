import { Card, Tag, Space, Typography } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

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

        {empleo.ubicacion && (
          <Text>
            <EnvironmentOutlined /> {empleo.ubicacion}
          </Text>
        )}

        {empleo.fecha_publicacion && (
          <Text>
            <CalendarOutlined /> {formatFecha(empleo.fecha_publicacion)}
          </Text>
        )}
      </Space>
    </Card>
  );
}

export default EmpleoCard;