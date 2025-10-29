const Loader = ({ loading, progressValue = 0 }) => {
  const style = loading ? { display: 'block' } : {};

  return (
    <div id="loader" className="loader" style={style}>
      <img src="/files/images/loading.gif" alt="Cargando contenido" style={{ width: '200px' }} />
      <progress id="progressBar" className="progressBar" value={progressValue} max="100" />
    </div>
  );
};

export default Loader;
