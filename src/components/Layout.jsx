import { createContext, useCallback, useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ReadingProgress from './ReadingProgress.jsx';

const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

const DEFAULT_EXTRAS = {
  controls: null,
  progress: 0,
  folio: '',
  showProgress: false,
};

export const NavExtrasContext = createContext({ setExtras: () => {} });

const Layout = () => {
  const [extrasState, setExtrasState] = useState(() => ({ ...DEFAULT_EXTRAS }));

  const setExtras = useCallback((value) => {
    if (!value) {
      setExtrasState({ ...DEFAULT_EXTRAS });
      return;
    }

    setExtrasState({
      controls: value.controls ?? null,
      progress: value.progress ?? 0,
      folio: value.folio ?? '',
      showProgress: value.showProgress ?? false,
    });
  }, []);

  const contextValue = useMemo(() => ({ setExtras }), [setExtras]);
  const { controls, progress, folio, showProgress } = extrasState;

  return (
    <NavExtrasContext.Provider value={contextValue}>
      <div className="d-flex flex-column min-vh-100" style={{ minHeight: '100vh' }}>
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top" aria-label="Menú principal">
          <div className="container-fluid flex-column align-items-stretch gap-2">
            <div className="d-flex align-items-center justify-content-between w-100 gap-3">
              <NavLink className="navbar-brand" to="/">
                CORPUS LEMATIZADO
                <br />
                DE LA LENGUA MUYSCA
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarsMain"
                aria-controls="navbarsMain"
                aria-expanded="false"
                aria-label="Mostrar navegación"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>

            <div className="collapse navbar-collapse w-100 gap-3" id="navbarsMain">
              <ul className="navbar-nav me-auto mb-2 mb-xl-0">
                <li className="nav-item">
                  <NavLink to="/presentacion" className={navLinkClass}>
                    Presentación
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link text-decoration-none"
                    id="dropdownSources"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    type="button"
                  >
                    Fuentes lingüístico-misioneras
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownSources">
                    <li>
                      <NavLink
                        to="/arte-bodleiana"
                        className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                      >
                        Arte de la Biblioteca Bodleiana
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/doctrina-bodleiana"
                        className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                      >
                        Doctrina de la Biblioteca Bodleiana
                      </NavLink>
                    </li>
                    <li>
                      <span className="dropdown-item disabled">Manuscrito II/2922 Real Biblioteca Madrid</span>
                    </li>
                    <li>
                      <NavLink
                        to="/manuscrito-ii-2923"
                        className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                      >
                        Manuscrito II/2923 Real Biblioteca Madrid
                      </NavLink>
                    </li>
                    <li>
                      <div className="dropdown-item">RM 158 Biblioteca Nacional de Colombia</div>
                      <ul className="list-unstyled ps-3">
                        <li>
                          <NavLink
                            to="/rm-158/gramatica"
                            className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                          >
                            Gramática
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/rm-158/modos"
                            className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                          >
                            Modos
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/rm-158/numeros"
                            className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                          >
                            Números
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/rm-158/vocabulario"
                            className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                          >
                            Vocabulario y catecismo
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink
                        to="/gramatica-de-lugo"
                        className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}
                      >
                        Gramática de Fray Bernardo de Lugo
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

              {controls && (
                <div className="lemma-controls-container w-100 d-flex justify-content-center">
                  {controls}
                </div>
              )}
            </div>
  
          </div>

          {showProgress && <ReadingProgress progress={progress} folio={folio} />}

        </nav>

        <main style={{ paddingTop: '150px' }} className="flex-grow-1">
          <Outlet />
        </main>

        <div className="tooltip-container">
          <div className="tooltip-header-bg" />
          <div className="tooltip-body" />
          <div className="tooltip-footer-bg" />
        </div>

        <footer className="mt-auto py-3 border-top">
          <div className="container">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a href="http://linguistics.digital/lematization" className="nav-link px-2 text-muted">
                  Powered by Linguistics.digital
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </NavExtrasContext.Provider>
  );
};

export default Layout;
