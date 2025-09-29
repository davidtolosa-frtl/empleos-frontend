import { Spin } from 'antd';

function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin size="large" />
    </div>
  );
}

export default LoadingSpinner;