import { Form, Input, InputNumber, Select, Typography } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function EmpleoForm({ form, loading }) {
  return (
    <>
      <Title level={4}>Información del Empleo</Title>

      <Form.Item
        label="Título del Empleo"
        name="titulo"
        rules={[{ required: true, message: 'Por favor ingresa el título' }]}
      >
        <Input placeholder="Ej: Desarrollador Full Stack" />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="descripcion"
        rules={[{ required: true, message: 'Por favor ingresa la descripción' }]}
      >
        <TextArea rows={4} placeholder="Describe el puesto y responsabilidades" />
      </Form.Item>

      <Form.Item
        label="Tipo de Empleo"
        name="tipo_empleo"
        rules={[{ required: true, message: 'Selecciona el tipo de empleo' }]}
      >
        <Select placeholder="Selecciona tipo">
          <Option value="full-time">Tiempo Completo</Option>
          <Option value="part-time">Medio Tiempo</Option>
          <Option value="freelance">Freelance</Option>
          <Option value="contrato">Contrato</Option>
          <Option value="pasantia">Pasantía</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Ubicación"
        name="ubicacion"
        rules={[{ required: true, message: 'Por favor ingresa la ubicación' }]}
      >
        <Input placeholder="Ej: Buenos Aires, Argentina" />
      </Form.Item>

      <Form.Item
        label="Salario"
        name="salario"
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="Salario mensual"
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
    </>
  );
}

export default EmpleoForm;