import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import StaticHtmlPage from './pages/StaticHtmlPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const staticPages = [
  {
    path: 'presentacion',
    source: '/raw/presentacion.html',
    title: 'Presentación',
    enableReadingProgress: false,
    showLemmaControls: false,
    legacyScripts: [],
  },
  {
    path: 'arte-bodleiana',
    source: '/raw/Arte_bodleiana.html',
    title: 'Arte de la Biblioteca Bodleiana',
    showLemmaControls: true,
  },
  {
    path: 'doctrina-bodleiana',
    source: '/raw/Doctrina_bodleiana.html',
    title: 'Doctrina de la Biblioteca Bodleiana',
    showLemmaControls: true,
  },
  {
    path: 'manuscrito-ii-2923',
    source: '/raw/II_2923.html',
    title: 'Manuscrito II/2923 Real Biblioteca Madrid',
    showLemmaControls: true,
  },
  {
    path: 'rm-158/gramatica',
    source: '/raw/RM_158_gra.html',
    title: 'RM 158 · Gramática',
    showLemmaControls: true,
  },
  {
    path: 'rm-158/modos',
    source: '/raw/RM_158_mod.html',
    title: 'RM 158 · Modos',
    showLemmaControls: true,
  },
  {
    path: 'rm-158/numeros',
    source: '/raw/RM_158_num.html',
    title: 'RM 158 · Números',
    showLemmaControls: true,
  },
  {
    path: 'rm-158/vocabulario',
    source: '/raw/RM_158_voc.html',
    title: 'RM 158 · Vocabulario y catecismo',
    showLemmaControls: true,
  },
  {
    path: 'gramatica-de-lugo',
    source: '/raw/gra_lugo.html',
    title: 'Gramática de Fray Bernardo de Lugo',
    showLemmaControls: true,
  },
];

const App = () => (
  <ScrollToTop>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {staticPages.map(
          ({ path, source, title, enableReadingProgress, showLemmaControls, legacyScripts }) => (
            <Route
              key={path}
              path={path}
              element={
                <StaticHtmlPage
                  source={source}
                  title={title}
                  enableReadingProgress={enableReadingProgress !== false}
                  showLemmaControls={showLemmaControls}
                  legacyScripts={legacyScripts}
                />
              }
            />
          ),
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </ScrollToTop>
);

export default App;
