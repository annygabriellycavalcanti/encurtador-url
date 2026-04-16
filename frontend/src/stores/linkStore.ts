import { defineStore } from 'pinia';
import axios from 'axios';
import type { Link } from '../interfaces/ILink';

const API_URL = 'http://localhost:3333';

export const useLinkStore = defineStore('linkStore', {
  state: () => ({
    links: [] as Link[],
    error: null as string | null,
    newShortLink: null as Link | null,
  }),

  getters: {
    getShortUrl: () => (shortCode: string) => {
      return `${API_URL}/${shortCode}`;
    },
  },

  actions: {
    async fetchLinks() {
      try {
        const response = await axios.get<Link[]>(`${API_URL}/links`);
        this.links = response.data;
      } catch (err) {
        this.error = 'Não foi possível carregar os links.';
        console.error(err);
      }
    },

    async shortenUrl(originalUrl: string) {
      this.error = null;
      this.newShortLink = null;

      if (!originalUrl) {
        this.error = 'Por favor, insira uma URL.';
        return;
      }

      try {
        const response = await axios.post<Link>(`${API_URL}/links`, {
          originalUrl: originalUrl,
        });
        this.newShortLink = response.data;
        await this.fetchLinks(); // Atualiza a lista
      } catch (err) {
        this.error = 'Ocorreu um erro ao encurtar a URL. Verifique o link e tente novamente.';
        console.error(err);
        throw err; // Lança o erro para o componente saber que falhou
      }
    },
  },
});