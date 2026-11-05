// Movimento do site. Cada efeito tem um motivo:
// - revelar ao rolar: cada seção chega na hora em que é lida
// - foto de abertura que abre até as bordas: leva o olhar do nome da banda para o palco
// - trilho dos lugares: a seção principal vira um passeio pelos palcos
// Tudo desliga com "reduzir movimento" do sistema.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)');

// Revelar ao entrar na tela
const revelaveis = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduzir.matches || !('IntersectionObserver' in window)) {
  revelaveis.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revelaveis.forEach((el) => io.observe(el));
}

// Menu fica sólido depois que o título sai da tela
const nav = document.querySelector<HTMLElement>('[data-nav]');
const topo = document.querySelector('#titulo-banda');
if (nav && topo) {
  new IntersectionObserver(([e]) => nav.classList.toggle('is-solid', !e.isIntersecting), {
    rootMargin: '-60px 0px 0px 0px',
  }).observe(topo);
} else if (nav) {
  nav.classList.add('is-solid');
}

// Clipes: troca a capa pelo vídeo só quando a pessoa clica (página mais leve)
document.querySelectorAll<HTMLButtonElement>('[data-youtube]').forEach((botao) => {
  botao.addEventListener('click', () => {
    const id = botao.dataset.youtube;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = `Clipe de ${botao.dataset.titulo ?? ''}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    botao.replaceWith(iframe);
  });
});

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Abertura: a foto começa com margens e abre até as bordas ao rolar
  const palco = document.querySelector<HTMLElement>('[data-palco]');
  const moldura = document.querySelector<HTMLElement>('[data-moldura]');
  const foto = document.querySelector<HTMLElement>('[data-palco-foto]');
  if (palco && moldura && foto) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: palco, start: 'top 85%', end: 'bottom bottom', scrub: 0.6 },
    });
    tl.fromTo(palco, { paddingLeft: () => getComputedStyle(palco).paddingLeft, paddingRight: () => getComputedStyle(palco).paddingRight }, { paddingLeft: 0, paddingRight: 0, ease: 'none' }, 0)
      .fromTo(foto, { scale: 1.14 }, { scale: 1, ease: 'none' }, 0);
  }

});

let lugaresST: ScrollTrigger | null = null;

// Setas dos lugares: funcionam no celular (rolagem lateral) e no computador (seção presa)
const janela = document.querySelector<HTMLElement>('.lugares__janela');
const trilhoLugares = document.querySelector<HTMLElement>('[data-lugares-trilho]');
const btnAnt = document.querySelector<HTMLButtonElement>('[data-lugares-ant]');
const btnProx = document.querySelector<HTMLButtonElement>('[data-lugares-prox]');
const cartoes = Array.from(document.querySelectorAll<HTMLElement>('[data-lugar]'));

function posicoes() {
  if (!trilhoLugares || !cartoes.length) return [];
  const inicio = cartoes[0].offsetLeft;
  return cartoes.map((c) => c.offsetLeft - inicio);
}

function estado() {
  // Onde o trilho está agora e até onde ele pode ir
  if (lugaresST) {
    const max = lugaresST.end - lugaresST.start;
    const atual = Math.min(max, Math.max(0, window.scrollY - lugaresST.start));
    return { atual, max };
  }
  if (janela) return { atual: janela.scrollLeft, max: janela.scrollWidth - janela.clientWidth };
  return { atual: 0, max: 0 };
}

function atualizaSetas() {
  if (!btnAnt || !btnProx) return;
  const { atual, max } = estado();
  btnAnt.disabled = atual <= 4;
  btnProx.disabled = atual >= max - 4;
}

function vaiPara(direcao: 1 | -1) {
  const { atual, max } = estado();
  const pos = posicoes();
  const alvo =
    direcao === 1
      ? pos.find((p) => p > atual + 8) ?? max
      : [...pos].reverse().find((p) => p < atual - 8) ?? 0;
  const destino = Math.min(max, Math.max(0, alvo));
  const suave = reduzir.matches ? 'auto' : 'smooth';
  if (lugaresST) {
    window.scrollTo({ top: lugaresST.start + destino, behavior: suave });
  } else if (janela) {
    janela.scrollTo({ left: destino, behavior: suave });
  }
}

// Lugares: no computador, a seção fica presa e os palcos passam de lado
mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
  const fixo = document.querySelector<HTMLElement>('[data-lugares-fixo]');
  const trilho = document.querySelector<HTMLElement>('[data-lugares-trilho]');
  if (!fixo || !trilho) return;

  const distancia = () => Math.max(0, trilho.scrollWidth - document.documentElement.clientWidth);
  if (distancia() < 40) return;

  const tween = gsap.to(trilho, {
    x: () => -distancia(),
    ease: 'none',
    scrollTrigger: {
      trigger: fixo,
      start: 'top top',
      end: () => `+=${distancia()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: () => atualizaSetas(),
      onRefresh: () => atualizaSetas(),
    },
  });
  lugaresST = tween.scrollTrigger ?? null;
  return () => {
    lugaresST = null;
  };
});

btnAnt?.addEventListener('click', () => vaiPara(-1));
btnProx?.addEventListener('click', () => vaiPara(1));
janela?.addEventListener('scroll', atualizaSetas, { passive: true });
window.addEventListener('resize', atualizaSetas);
atualizaSetas();

// Recalcula depois que as imagens carregam (alturas mudam)
window.addEventListener('load', () => ScrollTrigger.refresh());
