import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Loader from '../components/Loader.jsx';
import useReadingProgress from '../hooks/useReadingProgress.js';
import { NavExtrasContext } from '../components/Layout.jsx';

const defaultScripts = [
  '/files/js/code.jquery.com_jquery-3.7.0.min.js',
  '/files/js/entries.js',
  '/files/js/modal.js',
  '/files/js/popper.min.js',
  '/files/js/toolTip.js',
  '/files/js/toolBar.js',
];

const routeMap = {
  'index.html': '/',
  'presentacion.html': '/presentacion',
  'Arte_bodleiana.html': '/arte-bodleiana',
  'Doctrina_bodleiana.html': '/doctrina-bodleiana',
  'II_2923.html': '/manuscrito-ii-2923',
  'RM_158_gra.html': '/rm-158/gramatica',
  'RM_158_mod.html': '/rm-158/modos',
  'RM_158_num.html': '/rm-158/numeros',
  'RM_158_voc.html': '/rm-158/vocabulario',
  'gra_lugo.html': '/gramatica-de-lugo',
};

const normalizeHtmlMarkup = (markup) => {
  if (!markup) {
    return '';
  }

  let output = markup;

  const replacements = [
    { pattern: /src="\.?\/?images\//g, value: 'src="/images/' },
    { pattern: /src='\.?\/?images\//g, value: "src='/images/" },
    { pattern: /href="\.?\/?images\//g, value: 'href="/images/' },
    { pattern: /href='\.?\/?images\//g, value: "href='/images/" },
    { pattern: /src="\.?\/?files\//g, value: 'src="/files/' },
    { pattern: /src='\.?\/?files\//g, value: "src='/files/" },
    { pattern: /href="\.?\/?files\//g, value: 'href="/files/' },
    { pattern: /href='\.?\/?files\//g, value: "href='/files/" },
  ];

  replacements.forEach(({ pattern, value }) => {
    output = output.replace(pattern, value);
  });

  output = output
    .replace(/url\('images\//g, "url('/images/")
    .replace(/url\("images\//g, 'url("/images/')
    .replace(/url\(images\//g, 'url(/images/')
    .replace(/url\('files\//g, "url('/files/")
    .replace(/url\("files\//g, 'url("/files/')
    .replace(/url\(files\//g, 'url(/files/');

  const remapLink = (href, quote) => {
    const cleaned = href.replace(/^\.\//, '');
    const [pathAndQuery, fragment] = cleaned.split('#');
    const [path, query] = pathAndQuery.split('?');
    const mapped = routeMap[path];
    if (!mapped) {
      return null;
    }
    let suffix = '';
    if (query) {
      suffix += `?${query}`;
    }
    if (fragment) {
      suffix += `#${fragment}`;
    }
    return `${quote}${mapped}${suffix}${quote}`;
  };

  output = output.replace(/href="([^"]+?\.html[^"]*)"/g, (match, href) => {
    const mapped = remapLink(href, '"');
    return mapped ? `href=${mapped}` : match;
  });

  output = output.replace(/href='([^']+?\.html[^']*)'/g, (match, href) => {
    const mapped = remapLink(href, "'");
    return mapped ? `href=${mapped}` : match;
  });

  return output;
};

const loadScriptOnce = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    document.body.appendChild(script);
  });

const waitForLemmaControls = () =>
  new Promise((resolve) => {
    const ids = ['checkboxLemas', 'checkboxAnadidos', 'checkboxLista', 'checkboxXVII'];
    const isReady = () => ids.every((id) => document.getElementById(id));

    if (isReady()) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (isReady()) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });

const resetLemmaControls = () => {
  ['checkboxLemas', 'checkboxAnadidos', 'checkboxLista', 'checkboxXVII'].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.checked = false;
    }
  });

  const folio = document.getElementById('body');
  if (folio) {
    folio.classList.remove('fuente_xvii');
    folio.style.fontFamily = '';
  }
};

const StaticHtmlPage = ({
  source,
  title,
  enableReadingProgress = true,
  legacyScripts = defaultScripts,
  showLemmaControls = false,
}) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const [contentVersion, setContentVersion] = useState(0);
  const { setExtras } = useContext(NavExtrasContext);

  const lemmaControls = useMemo(
    () => (
      <div className="lemma-controls-grid">
        <div className="lemma-control-item d-flex align-items-center gap-2">
          <input type="checkbox" id="checkboxLemas" />
          <label className="text-light mb-0" htmlFor="checkboxLemas">
            Resaltar lemas
          </label>
        </div>
        <div className="lemma-control-item d-flex align-items-center gap-2">
          <input type="checkbox" id="checkboxAnadidos" />
          <label className="text-light mb-0" htmlFor="checkboxAnadidos">
            Ocultar añadidos
          </label>
        </div>
        <div className="lemma-control-item d-flex align-items-center gap-2">
          <input type="checkbox" id="checkboxLista" />
          <label className="text-light mb-0" htmlFor="checkboxLista">
            Listar entradas
          </label>
        </div>
        <div className="lemma-control-item d-flex align-items-center gap-2">
          <input type="checkbox" id="checkboxXVII" />
          <label className="text-light mb-0" htmlFor="checkboxXVII">
            Tipografía siglo XVII
          </label>
        </div>
      </div>
    ),
    [],
  );

  useEffect(() => {
    document.title = `${title} · Corpus Lematizado de la Lengua Muysca`;
  }, [title]);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError('');

    const fetchContent = async () => {
      try {
        const response = await fetch(source);
        if (!response.ok) {
          throw new Error(`Error ${response.status} al cargar el recurso`);
        }
        const html = await response.text();
        if (!isActive) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.querySelector('#body');
        const rawMarkup = bodyContent ? bodyContent.outerHTML : html;
        setContent(normalizeHtmlMarkup(rawMarkup));
        setContentVersion((prev) => prev + 1);
      } catch (err) {
        console.error(err);
        if (isActive) {
          setError('No se pudo cargar el contenido solicitado.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isActive = false;
    };
  }, [source]);

  useEffect(() => {
    if (loading || !content) {
      return;
    }

    const loadScripts = async () => {
      try {
        if (showLemmaControls) {
          await waitForLemmaControls();
          resetLemmaControls();
        }

        for (const script of legacyScripts) {
          // eslint-disable-next-line no-await-in-loop
          await loadScriptOnce(script);
        }

        if (
          showLemmaControls &&
          typeof window !== 'undefined' &&
          typeof window.initLemmaControls === 'function'
        ) {
          window.initLemmaControls();
        }
      } catch (err) {
        console.warn(err.message);
      }
    };

    loadScripts();
  }, [content, loading, legacyScripts, showLemmaControls]);

  const { progress, folio } = useReadingProgress(containerRef, enableReadingProgress, contentVersion);

  useEffect(() => {
    setExtras({
      controls: showLemmaControls ? lemmaControls : null,
      progress: enableReadingProgress ? progress : 0,
      folio: enableReadingProgress ? folio : '',
      showProgress: enableReadingProgress,
    });
  }, [enableReadingProgress, folio, lemmaControls, progress, setExtras, showLemmaControls]);

  useEffect(
    () => () => {
      setExtras(null);
    },
    [setExtras],
  );

  return (
    <div className="container pb-5">
      <Loader loading={loading} />
      {error && <p className="alert alert-danger mt-4">{error}</p>}
      {!loading && !error && (
        <div ref={containerRef} className="static-html" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
};

export default StaticHtmlPage;
