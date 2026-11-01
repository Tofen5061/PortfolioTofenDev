import { useState, useEffect, useRef } from 'react';
import { PROFILES, PROFILE_ORDER, waLink, type ProfileKey } from '../data/site';

const AVATAR_SIZE = 168;

// ============================================================
// Íconos SVG
// ============================================================
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const LINK_ICONS = { github: <GithubIcon />, linkedin: <LinkedinIcon /> };

// ============================================================
// Componente Typewriter (Efecto de máquina de escribir)
// ============================================================
interface TypewriterProps {
  text: string;
  startDelay?: number; // Tiempo a esperar antes de empezar a escribir (ms)
  speed?: number; // Velocidad por carácter (ms)
}

function Typewriter({ text, startDelay = 150, speed = 22 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');

    let index = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay, speed]);

  return (
    <>
      {/* Los lectores de pantalla leen el texto completo de una vez */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayedText}
        <span className="ml-1 inline-block h-[1em] w-[2px] animate-blink bg-primary align-middle" />
      </span>
    </>
  );
}

// ============================================================
// Componente principal
// ============================================================
interface ProfileSwitcherProps {
  initial?: ProfileKey;
}

export default function ProfileSwitcher({ initial = 'tofen' }: ProfileSwitcherProps) {
  const [active, setActive] = useState<ProfileKey>(initial);
  const isFirstLoad = useRef(true);
  const profile = PROFILES[active];

  // Sincroniza tema, título y URL con el perfil activo
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', active);
    document.title = profile.pageTitle;
    if (location.pathname !== profile.path) history.replaceState(null, '', profile.path);
    window.dispatchEvent(new CustomEvent('profile:changed', { detail: active }));
    isFirstLoad.current = false;
  }, [active]);

  // El menú y el pie de página piden cambiar de perfil con este evento
  useEffect(() => {
    const onSet = (event: Event) => setActive((event as CustomEvent<ProfileKey>).detail);
    window.addEventListener('profile:set', onSet);
    return () => window.removeEventListener('profile:set', onSet);
  }, []);

  const visibleLinks = profile.links.filter((link) => link.href);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
      {/* ============================================= */}
      {/* Carrusel de avatares                          */}
      {/* ============================================= */}
      <div
        className="relative flex h-[210px] w-full items-center justify-center select-none sm:h-[250px]"
        role="group"
        aria-label="Elige un perfil"
      >
        {PROFILE_ORDER.map((key, index) => {
          const item = PROFILES[key];
          const isActive = key === active;
          const sideClass =
            index === 0
              ? '-translate-x-[118px] sm:-translate-x-[170px]'
              : 'translate-x-[118px] sm:translate-x-[170px]';

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              aria-label={`Ver perfil de ${item.name}`}
              className={`absolute flex cursor-pointer flex-col items-center rounded-3xl transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                isActive
                  ? 'z-10 translate-x-0 scale-100 opacity-100'
                  : `${sideClass} scale-[.5] opacity-35 blur-[1px] hover:opacity-70 hover:blur-0`
              }`}
            >
              <span className={`avatar-ring ${isActive ? 'is-active' : ''}`}>
                <img
                  src={item.image}
                  alt=""
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="size-[128px] rounded-full object-cover sm:size-[168px]"
                  draggable={false}
                />
              </span>
              <span className="mt-4 font-display text-2xl font-bold tracking-tight text-heading">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================= */}
      {/* Presentación del perfil activo                */}
      {/* ============================================= */}
      <div key={active} className="mx-auto mt-6 max-w-3xl animate-fade-in">
        <span className="eyebrow">{profile.eyebrow}</span>

        <h1 className="mt-6 font-display text-4xl leading-[1.08] font-bold tracking-tight text-heading sm:text-6xl">
          {profile.headline} <span className="gradient-text">{profile.highlight}</span>
        </h1>

        <p className="mx-auto mt-6 min-h-[84px] max-w-2xl text-base leading-relaxed text-text-muted sm:min-h-[60px] sm:text-lg">
          <Typewriter text={profile.description} startDelay={isFirstLoad.current ? 900 : 150} />
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a className="btn btn-primary" href={waLink(profile.cta.message)} target="_blank" rel="noopener">
            <MessageIcon />
            {profile.cta.label}
          </a>
          <a className="btn btn-ghost" href={profile.secondary.href}>
            {profile.secondary.label}
            <ArrowDownIcon />
          </a>
          {visibleLinks.map((link) => (
            <a
              key={link.label}
              className="btn btn-ghost btn-icon"
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
              title={link.label}
            >
              {LINK_ICONS[link.icon]}
            </a>
          ))}
        </div>
      </div>

      <a href={profile.secondary.href} className="scroll-hint mt-14" aria-label="Bajar a la siguiente sección" />
    </section>
  );
}
