# 🏋️ Plataforma Fitness — Landing Page

Landing page institucional da **Plataforma Fitness**, academia localizada em Ipubi/PE. Site estático, responsivo e com foco em conversão (agendamento de aula experimental via WhatsApp), construído em **HTML, CSS e JavaScript puro**, sem frameworks ou dependências externas.

> **"Mais que uma academia, um novo estilo de vida!"**

---

## 📁 Estrutura do projeto

```text
.
├── index.html              # Estrutura e conteúdo da página
├── styles.css              # Estilos, tema visual e animações
├── script.js               # Interações, scroll tracking e efeitos
├── images/                 # Imagens de fundo
│   ├── costas-amplo3.png
│   ├── hero-gym.jpg
│   ├── logo.png
│   └── rosca-direta-Photoroom.png
└── README.md               # Este arquivo
```

---

## 🚀 Como rodar localmente

Não requer instalação nem build.

### Passos

1. Baixe todos os arquivos do projeto mantendo a estrutura de pastas.
2. Abra o arquivo `index.html` diretamente no navegador.

Para publicar, envie os arquivos para seu serviço de hospedagem (Netlify, Vercel, GitHub Pages, cPanel etc.), preservando a estrutura original do projeto.

---

## ✨ Seções da página

| Seção | ID | Conteúdo |
| :--- | :---: | :--- |
| Hero | `#hero` | Chamada principal + CTA de agendamento |
| Estrutura | `#estrutura` | Diferenciais da academia |
| Modalidades | `#modalidades` | Abas (Musculação / Funcional / Avaliação) com imagem dinâmica e fundo animado |
| Horário & Segurança | `#horario` | Horário de funcionamento e informações de segurança |
| Planos | `#planos` | Planos mensal, trimestral e semestral |
| Localização | `#local` | Endereço, mapa incorporado e botão de rota até a academia |
| Final | `#final` | Página de conversão, chama o cliente a contatar e frequentar a academia|

---

## 🎛️ Funcionalidades técnicas

- **Level Rail**
  - Navegação lateral fixa que acompanha o scroll e destaca a seção atual.

- **Reveal on Scroll**
  - Elementos aparecem suavemente conforme entram na tela utilizando `IntersectionObserver`.

- **Abas de Modalidades**
  - Troca de conteúdo e imagem sem recarregar a página, com transição em *fade*.

- **Fundo Animado (Modalidades)**
  - Efeito Ken Burns (zoom/pan lento).
  - Sombra dinâmica sobre a imagem.
  - Parallax sincronizado com o scroll.
  - Respeita automaticamente usuários com `prefers-reduced-motion`.

- **Botão "Como chegar"**
  - Abre o Google Maps já traçando a rota de carro até a academia.

---

## 🛠️ Customização rápida

| Alteração | Local |
| :--- | :--- |
| Número do WhatsApp | Buscar `5587996396237` em `index.html` |
| Preços dos planos | Seção `#planos` em `index.html` |
| Horário de funcionamento | Seção `#horario` em `index.html` |
| Endereço / mapa | Seção `#local` em `index.html` |
| Cores do tema | Variáveis em `:root` no início de `styles.css` |
| Imagem de fundo de Modalidades | Substituir `rosca-direta.jpg` mantendo o mesmo nome |

---

## ☁️ Deploy na Vercel

Site **100% estático**. Não requer build nem servidor próprio.

### Via painel (recomendado)

1. Envie o projeto para um repositório no GitHub.
2. Acesse **Vercel → Add New → Project**.
3. Selecione o repositório.
4. Em **Framework Preset**, escolha **Other**.
5. Deixe **Build Command** e **Output Directory** em branco (ou `.`).
6. Clique em **Deploy**.
7. Caso deseje, adicione um domínio próprio em **Settings → Domains**.

### Via CLI

```bash
npm install -g vercel
vercel
```

Qualquer novo `git push` para a branch conectada gera um deploy automático.

---

## 📱 Compatibilidade

- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari
- ✅ Mobile

Sem utilização de bibliotecas externas. Projeto desenvolvido utilizando apenas **HTML, CSS e JavaScript nativos**.
