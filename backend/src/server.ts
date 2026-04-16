import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { Link } from './types';

const app = express();

app.use(cors());
app.use(express.json());

const links: Link[] = [];

// Função para validar a URL
const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

app.post('/links', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  // Adicionando a validação de formato de URL no backend
  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Formato de URL inválido' });
  }

  const newLink: Link = {
    id: nanoid(),
    originalUrl,
    shortCode: nanoid(6),
    clicks: 0
  };

  links.push(newLink);
  return res.status(201).json(newLink);
});

app.get('/links', (req, res) => {
  return res.json(links);
});

app.get('/:code', (req, res) => {
  const { code } = req.params;
  const link = links.find(l => l.shortCode === code);

  if (!link) {
    return res.status(404).json({ error: 'Link não encontrado' });
  }

  link.clicks++; 
  return res.redirect(link.originalUrl);
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(` Servidor rodando:  http://localhost:${PORT}`);
});