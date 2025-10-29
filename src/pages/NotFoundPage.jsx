import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container py-5 text-center">
    <h1 className="display-5">Página no encontrada</h1>
    <p className="lead">No pudimos encontrar el recurso solicitado.</p>
    <Link to="/" className="btn btn-primary">
      Volver al inicio
    </Link>
  </div>
);

export default NotFoundPage;
