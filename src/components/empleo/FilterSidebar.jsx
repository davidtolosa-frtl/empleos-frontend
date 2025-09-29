import { Card, Form, Input, Select, Slider, Button, Space, Typography } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

function FilterSidebar({ onFilterChange, onClearFilters, tiposContrato = [] }) {
  const [form] = Form.useForm();

  const handleValuesChange = (_, allValues) => {
    onFilterChange(allValues);
  };

  const handleClear = () => {
    form.resetFields();
    onClearFilters();
  };

  return (
    <Card
      style={{
        height: '100%',
        position: 'sticky',
        top: '24px'
      }}
    >
      <Title level={4} style={{ marginBottom: '20px' }}>
        <SearchOutlined /> Filtros
      </Title>

      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Búsqueda"
          name="search"
        >
          <Input
            placeholder="Título o descripción"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Tipo de Contrato"
          name="tipo_contrato"
        >
          <Select
            placeholder="Seleccionar tipo"
            allowClear
          >
            {tiposContrato.length > 0 ? (
              tiposContrato.map(tipo => (
                <Option key={tipo} value={tipo}>{tipo}</Option>
              ))
            ) : (
              <>
                <Option value="Tiempo Completo">Tiempo Completo</Option>
                <Option value="Medio Tiempo">Medio Tiempo</Option>
                <Option value="Freelance">Freelance</Option>
                <Option value="Pasantía">Pasantía</Option>
                <Option value="Temporal">Temporal</Option>
              </>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ubicación"
          name="ubicacion"
        >
          <Input
            placeholder="Ciudad o provincia"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Empresa"
          name="empresa"
        >
          <Input
            placeholder="Nombre de empresa"
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Ordenar por"
          name="orderBy"
        >
          <Select
            placeholder="Seleccionar orden"
            defaultValue="fecha_desc"
          >
            <Option value="fecha_desc">Más recientes</Option>
            <Option value="fecha_asc">Más antiguos</Option>
            <Option value="titulo_asc">Título (A-Z)</Option>
            <Option value="titulo_desc">Título (Z-A)</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            icon={<ClearOutlined />}
            onClick={handleClear}
            block
          >
            Limpiar Filtros
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default FilterSidebar;