// bundle.js
document.addEventListener('DOMContentLoaded', () => {

  const card   = document.querySelector('.outter_card');
  const nameEl = document.getElementById('MyName');
  const link   = document.getElementById('MyGithub');
  const bio1   = document.getElementById('MyBio');
  const bio2   = document.getElementById('MyBio2');
  const LangBtn = document.getElementById('LanguageBtn');
  const UC3MBtn = document.getElementById('UC3MBtn');
  const UIUCBtn = document.getElementById('UIUCBtn');

  const UC3M = {
    bg: 'var(--uc3m-bg)',
    text: 'var(--uc3m-text)',
    link: 'var(--uc3m-link)'
  };
  const UIUC = {
    bg: 'var(--uiuc-bg)',
    text: 'var(--uiuc-text)',
    link: 'var(--uiuc-link)'
  };

        // --- (A) Expand/Collapse text below name ---
  let detailsHidden = false;
  function setDetailsVisibility(hidden) {
    let node = nameEl.nextElementSibling;
    while (node) {

      node.style.display = hidden ? 'none' : '';
      node = node.nextElementSibling;
    }

    nameEl.setAttribute('aria-expanded', String(!hidden));
  }
  setDetailsVisibility(false);
  nameEl.style.cursor = 'pointer';
  nameEl.addEventListener('click', () => {
    detailsHidden = !detailsHidden;
    setDetailsVisibility(detailsHidden);
  });

      // --- (B) Theme change
  function applyTheme(mode) {
    const palette = mode === 'uiuc' ? UIUC : UC3M;
    card.style.backgroundColor = palette.bg;

    card.querySelectorAll('h1,h4,p').forEach(el => el.style.color = palette.text);
    card.querySelectorAll('a').forEach(el => el.style.color = palette.link);
    localStorage.setItem('theme', mode);
  }

  
  if (UC3MBtn) {
    UC3MBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('uc3m');
    });
  }

  if (UIUCBtn) {
    UIUCBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyTheme('uiuc');
    });
  }

        // --- (C) Language cahnge (English - Spanish) ---
  const i18n = {
    en: {
      link: 'My Github profile',
      bio1: `I am a Computer Science student at Universidad Carlos III de Madrid (UC3M).
             Currently, an exchange student at University of Illinois Urbana-Champaign (UIUC).
             My interests lie in web development, data science and machine learning.`,
      bio2: `I enjoy building tools that combine programming and design to create both practical and useful solutions.
             In the past, I have worked on academic projects involving machine learning and prediction.
             I am excited to expand my knowledge and experience in software engineering through this course.`
    },
    es: {
      link: 'Mi perfil en GitHub',
      bio1: `Soy estudiante de Ciencia e Ingeniería de Datos en la Universidad Carlos III de Madrid (UC3M).
             Actualmente, estoy de intercambio en la University of Illinois Urbana-Champaign (UIUC).
             Me interesan el desarrollo web, la ciencia de datos y el aprendizaje automático.`,
      bio2: `Disfruto creando herramientas que combinan programación y diseño para obtener soluciones prácticas y útiles.
             A día de hoy, he trabajado en proyectos académicos de aprendizaje automático y predicción.
             Espero ampliar mis conocimientos y experiencia en ingeniería de software con este curso.`
    }
  };
  function oneLine(s){ return s.replace(/\s*\n\s*/g,' ').replace(/\s{2,}/g,' ').trim(); }
  function applyLang(lang) {
    document.documentElement.lang = lang;
    if (link) link.textContent = i18n[lang].link;
    if (bio1) bio1.textContent = oneLine(i18n[lang].bio1);
    if (bio2) bio2.textContent = oneLine(i18n[lang].bio2);
    localStorage.setItem('lang', lang);
    if (LangBtn) {
      LangBtn.textContent = (lang === 'en') ? 'ES' : 'EN';
    }
  }
  applyLang(localStorage.getItem('lang') === 'es' ? 'es' : 'en');

  if (LangBtn) {
    LangBtn.addEventListener('click', () => {
      const next = (localStorage.getItem('lang') === 'es') ? 'en' : 'es';
      applyLang(next);
    });
  }


});