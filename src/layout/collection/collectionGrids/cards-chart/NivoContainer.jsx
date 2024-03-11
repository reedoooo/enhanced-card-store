const NivoContainer = ({ children, height }) => (
  <div style={{ position: 'relative' }}>
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <div style={{ height: height || '200px' }}>{children}</div>
    </div>
  </div>
);

export default NivoContainer;
