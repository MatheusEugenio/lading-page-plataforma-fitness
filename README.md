# 🏋️ Plataforma Fitness — Landing Page

Landing page institucional da **Plataforma Fitness**, academia localizada em Ipubi/PE. Site estático, responsivo e com foco em conversão (agendamento de aula experimental via WhatsApp), construído em HTML, CSS e JavaScript puro — sem frameworks ou dependências externas.

> "Mais que uma academia, um novo estilo de vida!"

---

## 📁 Estrutura do projeto

.
├── index.html          # Estrutura e conteúdo da página
├── styles.css          # Estilos, tema visual e animações
├── script.js           # Interações, scroll tracking e efeitos
├── rosca-direta.jpg     # Imagem de fundo da seção "Modalidades"
└── README.md           # Este arquivo

⚠️ **Importante:** o arquivo `rosca-direta.jpg` precisa estar na mesma pasta dos demais arquivos — ele é referenciado via caminho relativo no `styles.css` (seção de fundo animado de Modalidades).

---

## 🚀 Como rodar localmente

Não requer instalação nem build. Basta:

1. Baixar os 4 arquivos do projeto pra mesma pasta.
2. Abrir o `index.html` direto no navegador.

Para publicar, envie os arquivos pro seu servidor/hospedagem (Netlify, Vercel, GitHub Pages, cPanel, etc.) — sempre mantendo a mesma estrutura de pasta.

---

## ✨ Seções da página

| Seção | ID | Conteúdo |
|---|---|---|
| Hero | `#hero` | Chamada principal + CTA de agendamento |
| Estrutura | `#estrutura` | Diferenciais da academia |
| Modalidades | `#modalidades` | Abas (Musculação / Funcional / Avaliação) com imagem dinâmica e fundo animado |
| Horário & Segurança | `#horario` | Horário de funcionamento e informações de segurança |
| Planos | `#planos` | Planos mensal, trimestral e semestral |
| Localização | `#local` | Endereço, mapa incorporado e botão de rota até a academia |

---

## 🎛️ Funcionalidades técnicas

- **Level rail** — navegação lateral fixa que acompanha o scroll e destaca a seção atual.
- **Reveal on scroll** — elementos aparecem suavemente conforme entram na tela (`IntersectionObserver`).
- **Abas de Modalidades** — troca de conteúdo e imagem sem reload, com transição de fade.
- **Fundo animado (Modalidades)** — efeito Ken Burns (zoom/pan lento) + sombra que se desloca continuamente pela imagem, com parallax reagindo ao scroll. Desativado automaticamente para quem usa `prefers-reduced-motion`.
- **Botão "Como chegar"** — abre o Google Maps já traçando a rota de carro até a academia.
- **CTA flutuante de WhatsApp** — sempre visível, com mensagem pré-preenchida.

---

## 🛠️ Customização rápida

| O que mudar | Onde |
|---|---|
| Número de WhatsApp | Buscar `5587996396237` em `index.html` |
| Preços dos planos | Seção `#planos` em `index.html` |
| Horário de funcionamento | Seção `#horario` em `index.html` |
| Endereço / mapa | Seção `#local` em `index.html` |
| Cores do tema | Variáveis no topo de `styles.css` (`:root`) |
| Imagem de fundo de Modalidades | Trocar o arquivo `rosca-direta.jpg` (mesmo nome) |

---

## 📱 Compatibilidade

Testado em navegadores modernos (Chrome, Safari, Firefox, Edge), desktop e mobile. Sem uso de bibliotecas externas — 100% HTML/CSS/JS nativo.