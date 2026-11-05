// Todo o conteúdo do site fica aqui. Para atualizar textos, links ou lugares,
// edite este arquivo. Campos vazios ('') simplesmente não aparecem no site.

import type { ImageMetadata } from 'astro';

import infinu from '../assets/lugares/infinu.jpg';
import unbPlateia from '../assets/lugares/unb-plateia.jpg';
import alquimia from '../assets/lugares/alquimia.jpg';
import festival from '../assets/fotos/festival-cruzeiro.jpg';
import live from '../assets/fotos/live-caseira.jpg';
import nave from '../assets/lugares/espaco-nave.jpg';
import zepellin from '../assets/lugares/zepellin.jpg';
import sarau from '../assets/lugares/sarau-psicodelico.jpg';

export const banda = {
  nome: 'Contra Cultura',
  resumo: 'Power trio de rock nacional autoral. Brasília, desde 2021.',
  email: 'bandacontracultura@gmail.com',
  telefone: '(61) 99204-8262',
  whatsapp: 'https://wa.link/vbqhg5',
};

export const redes = [
  { nome: 'Instagram', icone: 'instagram', url: 'https://www.instagram.com/bandacontracultura/' },
  { nome: 'YouTube', icone: 'youtube', url: 'https://www.youtube.com/@bandacontraculturaofc' },
  { nome: 'Spotify', icone: 'spotify', url: 'https://open.spotify.com/intl-pt/artist/4CO1UCaW6eieOQo84D9gAU' },
  { nome: 'TikTok', icone: 'tiktok', url: 'https://www.tiktok.com/@bandacontracultura' },
  { nome: 'WhatsApp', icone: 'whatsapp', url: 'https://wa.link/vbqhg5' },
] as const;

export const spotifyArtistaId = '4CO1UCaW6eieOQo84D9gAU';

export type Lugar = {
  nome: string;
  tipo: string; // ex.: 'Bar', 'Festival', 'Universidade'
  cidade: string; // TODO: preencher quando o Mário informar
  descricao: string; // TODO: 1 a 2 frases sobre o show
  foto?: ImageMetadata;
  link?: string; // vídeo ou post do show
};

// Ordem = ordem em que aparecem no site. Sem datas, de propósito.
export const lugares: Lugar[] = [
  { nome: 'Infinu', tipo: '', cidade: '', descricao: '', foto: infinu },
  { nome: 'UnB', tipo: 'Universidade', cidade: '', descricao: '', foto: unbPlateia },
  { nome: 'Festival de Rock no Cruzeiro', tipo: 'Festival', cidade: '', descricao: '', foto: festival },
  { nome: 'Espaço Nave', tipo: '', cidade: '', descricao: '', foto: nave },
  { nome: 'Zepellin', tipo: '', cidade: '', descricao: '', foto: zepellin },
  { nome: 'Alquimia Taberna Bar', tipo: 'Bar', cidade: '', descricao: '', foto: alquimia },
  { nome: 'Sarau Psicodélico', tipo: 'Sarau', cidade: '', descricao: '', foto: sarau },
  { nome: 'Live Caseira', tipo: 'Live', cidade: '', descricao: '', foto: live },
];

// Mesma ordem do perfil no Spotify
export const musicas = [{ titulo: 'Lis-Lírio' }, { titulo: 'Animal' }, { titulo: 'Algo Parecido' }];

export const videos = [
  { titulo: 'Animal', tipo: 'Clipe oficial', youtubeId: 'soFQTg9EfDw' },
  { titulo: 'Algo Parecido', tipo: 'Clipe oficial', youtubeId: 'OY0fS3AOQDw' },
  { titulo: 'Live Caseira', tipo: 'Live em clima de luau', youtubeId: 'dWnkKPz0Ubk' },
];

export const integrantes = [
  { nome: 'Paim', funcao: 'Guitarra e voz' },
  { nome: 'Mamaco', funcao: 'Baixo e voz' },
  { nome: 'JPEG', funcao: 'Bateria e backing vocal' },
];
