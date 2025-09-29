import { useState, useEffect, useMemo } from 'react';
import { Row, Col, List, Typography, message } from 'antd';
import api from '../services/api';
import LoadingSpinner from '../components/empleo/LoadingSpinner';
import EmpleoCard from '../components/empleo/EmpleoCard';
import FilterSidebar from '../components/empleo/FilterSidebar';

const { Title } = Typography;

function ListaEmpleos() {
  const [empleos, setEmpleos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    tipo_contrato: undefined,
    ubicacion: '',
    empresa: '',
    orderBy: 'fecha_desc'
  });

  useEffect(() => {
    obtenerEmpleos();
  }, []);

  const obtenerEmpleos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/avisos');
      setEmpleos(response.data);
    } catch (error) {
      message.error('Error al cargar los empleos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const tiposContratoUnicos = useMemo(() => {
    const tipos = empleos
      .map(empleo => empleo.tipo_contrato)
      .filter(tipo => tipo && tipo.trim() !== '');
    return [...new Set(tipos)];
  }, [empleos]);

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

    // Filtro por ubicación
    if (filters.ubicacion) {
      const ubicacionLower = filters.ubicacion.toLowerCase();
      resultado = resultado.filter(empleo =>
        empleo.ubicacion?.toLowerCase().includes(ubicacionLower)
      );
    }

    // Filtro por empresa
    if (filters.empresa) {
      const empresaLower = filters.empresa.toLowerCase();
      resultado = resultado.filter(empleo =>
        empleo.empresa_nombre?.toLowerCase().includes(empresaLower)
      );
    }

    // Ordenamiento
    switch (filters.orderBy) {
      case 'fecha_desc':
        resultado.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
        break;
      case 'fecha_asc':
        resultado.sort((a, b) => new Date(a.fecha_publicacion) - new Date(b.fecha_publicacion));
        break;
      case 'titulo_asc':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'titulo_desc':
        resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      default:
        break;
    }

    return resultado;
  }, [empleos, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      tipo_contrato: undefined,
      ubicacion: '',
      empresa: '',
      orderBy: 'fecha_desc'
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Empleos Disponibles</Title>

      <Row gutter={24}>
        <Col xs={24} sm={24} md={6} lg={6} xl={5}>
          <FilterSidebar
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            tiposContrato={tiposContratoUnicos}
          />
        </Col>

        <Col xs={24} sm={24} md={18} lg={18} xl={19}>
          <div style={{ marginTop: { xs: '24px', md: 0 } }}>
            <Typography.Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
              {empleosFiltrados.length} {empleosFiltrados.length === 1 ? 'empleo encontrado' : 'empleos encontrados'}
            </Typography.Text>

            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
              dataSource={empleosFiltrados}
              renderItem={(empleo) => (
                <List.Item>
                  <EmpleoCard empleo={empleo} />
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ListaEmpleos;