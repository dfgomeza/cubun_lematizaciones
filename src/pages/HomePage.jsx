import { Link } from 'react-router-dom';

const cardStyle = (image) => ({
  backgroundImage: `url(${image})`,
});

const HomePage = () => {
  return (
    <section className="container py-5 landing-page">
      <h2>Folletos Bodleianos (Oxford, Inglaterra. 1603)</h2>

      <div className="row g-1 g-md-4">
        <div className="col-12 col-md-6 d-flex justify-content-end mb-3 mb-md-0">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/arte-bodleiana"
            aria-label="Arte de la Biblioteca Bodleiana"
            style={cardStyle('/images/assets/bodleiana_arte.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Arte de la Lengua Mosca de los Indios del Nuevo Reyno de Granada</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Bodleiana, Oxford.</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-start">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/doctrina-bodleiana"
            aria-label="Doctrina de la Biblioteca Bodleiana"
            style={cardStyle('/images/assets/bodleiana_doctrina.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Doctrina Cristiana en la Lengua Mosca de los Indios del Nuevo Reyno de Granada</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Bodleiana, Oxford.</div>
          </Link>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row g-1 g-md-4">
        <h2>Real Biblioteca (Madrid, España)</h2>

        <div className="col-12 col-md-6 d-flex justify-content-end mb-3 mb-md-0">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/manuscrito-ii-2923"
            aria-label="Manuscrito II/2923"
            style={cardStyle('/images/assets/ii_2923.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Manuscrito II/2923 Vocabulario mosco 1612</strong>
            </div>
            <div className="subtitulo-portada">Real Biblioteca, Madrid.</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-start" style={{ opacity: 0.5 }}>
          <button
            type="button"
            className="book-card d-block position-relative text-decoration-none portada btn btn-link p-0"
            style={cardStyle('/images/assets/null.jpg')}
            data-bs-toggle="modal"
            data-bs-target="#pendienteModal"
            aria-label="Manuscrito II/2922 pendiente"
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Manuscrito II/2922</strong>
            </div>
            <div className="subtitulo-portada">Real Biblioteca, Madrid.</div>
          </button>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row g-1 g-md-4">
        <h2>Raro Manuscrito 158 - Biblioteca Nacional (Bogotá, Colombia)</h2>

        <div className="col-12 col-md-6 d-flex justify-content-end mb-3 mb-md-0">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/rm-158/gramatica"
            aria-label="Raro Manuscrito 158 Gramática"
            style={cardStyle('/images/assets/rm_158_gra.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Raro Manuscrito 158 - Gramática</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Nacional, Bogotá.</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-start mb-3 mb-md-0">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/rm-158/modos"
            aria-label="Raro Manuscrito 158 Modos"
            style={cardStyle('/images/assets/rm_158_mod.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Raro Manuscrito 158 - Modos</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Nacional, Bogotá.</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-end mb-3 mb-md-0">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/rm-158/numeros"
            aria-label="Raro Manuscrito 158 Números"
            style={cardStyle('/images/assets/rm_158_num.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Raro Manuscrito 158 - Números</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Nacional, Bogotá.</div>
          </Link>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-start">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/rm-158/vocabulario"
            aria-label="Raro Manuscrito 158 Vocabulario y catecismo"
            style={cardStyle('/images/assets/rm_158_voc.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Raro Manuscrito 158 - Vocabulario y Catecismo</strong>
            </div>
            <div className="subtitulo-portada">Biblioteca Nacional, Bogotá.</div>
          </Link>
        </div>
      </div>

      <hr className="my-5" />

      <div className="row g-1 g-md-4">
        <h2>Gramática de Lugo (1619)</h2>

        <div className="col-12 d-flex justify-content-center">
          <Link
            className="book-card d-block position-relative text-decoration-none portada"
            to="/gramatica-de-lugo"
            aria-label="Gramática de Fray Bernardo de Lugo"
            style={cardStyle('/images/assets/gra_lugo.jpg')}
          >
            <div className="rounded-3 titulo-portada">
              <strong className="book-title">Gramática en la Lengua General del Nuevo Reino de Granada llamada Mosca</strong>
            </div>
            <div className="subtitulo-portada">Universidad del Rosario, Bogotá.</div>
          </Link>
        </div>
      </div>

      <div className="modal fade" id="pendienteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-4">
            <h5 className="modal-title mb-3">Pendiente de lematización</h5>
            <p className="mb-0">Se prepara proyecto para 2026 y 2027.</p>
            <button type="button" className="btn btn-primary mt-3" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
