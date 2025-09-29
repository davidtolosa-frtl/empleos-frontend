import { useState, useEffect } from 'react';
import { Form, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import EmpleoForm from '../components/empleo/EmpleoForm';
import EmpresaForm from '../components/empresa/EmpresaForm';

const { Title } = Typography;

function CrearEmpleo() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [empresasFiltradas, setEmpresasFiltradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    try {
      const response = await api.get('/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al cargar empresas:', error);
    }
  };

  const handleBuscarEmpresa = (searchText) => {
    if (!searchText) {
      setEmpresasFiltradas([]);
      return;
    }

    const filtradas = empresas
      .filter((emp) =>
        emp.nombre.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((emp) => ({
        value: emp.nombre,
        label: emp.nombre,
        id: emp.id,
        descripcion: emp.descripcion
      }));

    setEmpresasFiltradas(filtradas);
  };

  const handleSeleccionarEmpresa = (value, option) => {
    if (option && option.descripcion) {
      form.setFieldsValue({ empresa_descripcion: option.descripcion });
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Primero buscar si la empresa existe
      const empresasResponse = await api.get('/empresas');
      let empresaId = null;

      const empresaExistente = empresasResponse.data.find(
        (emp) => emp.nombre.toLowerCase() === values.empresa_nombre.toLowerCase()
      );

      if (empresaExistente) {
        // Si existe, usar su ID
        empresaId = empresaExistente.id;
      } else {
        // Si no existe, crear la empresa
        const nuevaEmpresa = {
          nombre: values.empresa_nombre,
          descripcion: values.empresa_descripcion || 'Sin descripción',
        };
        const empresaCreada = await api.post('/empresas', nuevaEmpresa);
        empresaId = empresaCreada.data.id;
      }

      // Crear el aviso con el ID de la empresa
      const nuevoAviso = {
        titulo: values.titulo,
        descripcion: values.descripcion,
        empresa_id: empresaId,
        ubicacion: values.ubicacion,
        tipo_contrato: values.tipo_empleo,
      };

      await api.post('/avisos', nuevoAviso);

      message.success('Empleo creado exitosamente');
      form.resetFields();
      navigate('/');
    } catch (error) {
      message.error('Error al crear el empleo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Publicar Nuevo Empleo</Title>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <EmpleoForm form={form} loading={loading} />

          <EmpresaForm
            form={form}
            empresasFiltradas={empresasFiltradas}
            onSearch={handleBuscarEmpresa}
            onSelect={handleSeleccionarEmpresa}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Publicar Empleo
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CrearEmpleo;