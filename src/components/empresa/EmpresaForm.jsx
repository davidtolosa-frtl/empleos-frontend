import { Form, Input, AutoComplete, Typography } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

function EmpresaForm({ form, empresasFiltradas, onSearch, onSelect }) {
  return (
    <>
      <Title level={4} style={{ marginTop: '24px' }}>Información de la Empresa</Title>

      <Form.Item
        label="Nombre de la Empresa"
        name="empresa_nombre"
        rules={[{ required: true, message: 'Por favor ingresa el nombre de la empresa' }]}
        extra="Comienza a escribir para buscar empresas existentes. Si no existe, se creará automáticamente"
      >
        <AutoComplete
          options={empresasFiltradas}
          onSearch={onSearch}
          onSelect={onSelect}
          placeholder="Ej: Tech Solutions"
          filterOption={false}
        />
      </Form.Item>

      <Form.Item
        label="Descripción de la Empresa"
        name="empresa_descripcion"
      >
        <TextArea rows={3} placeholder="Breve descripción de la empresa (opcional)" />
      </Form.Item>
    </>
  );
}

export default EmpresaForm;