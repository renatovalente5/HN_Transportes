# HN Transportes — Website

Sítio institucional da **Hélder Nunes - Transportes, Unipessoal, Lda** (marca «HN Transportes»),
empresa de transporte rodoviário de mercadorias em carrinhas de caixa até 3.500 kg —
serviços expresso, dedicados e diretos, 24h/dia, a nível nacional e ibérico.

🔗 **Site:** https://hntransportes.pt/ (alojado no GitHub Pages, domínio personalizado via `CNAME`)

## Tecnologia

Site **estático** em HTML + CSS + JavaScript puro, sem framework e sem passo de _build_.
Pensado para alojamento no **GitHub Pages**.

- **Sem cookies / privacidade desde a conceção:** sem Google Analytics, sem mapas incorporados,
  sem _embeds_ de redes sociais e com tipografias alojadas no próprio site. Por isso não é
  necessário banner de consentimento de cookies.
- **Responsivo** (mobile-first) e construído segundo as boas práticas de acessibilidade **WCAG 2.1 AA**.
- **SEO:** metadados, Open Graph, dados estruturados JSON-LD (`MovingCompany`), `sitemap.xml` e `robots.txt`.

## Estrutura

```
.
├── index.html              Página principal (one-page)
├── privacidade.html        Política de Privacidade (RGPD)
├── cookies.html            Política de Cookies
├── termos.html             Termos e Aviso Legal (identificação legal, IMT, RAL)
├── 404.html
├── robots.txt · sitemap.xml · site.webmanifest · favicon.ico · .nojekyll
└── assets/
    ├── css/styles.css      Design system + todas as secções
    ├── js/main.js          Menu mobile, header fixo, animações, lightbox
    ├── fonts/              Fonte Sora (self-hosted, .woff2)
    └── img/
        ├── logo.png · logo-light.png · og-image.jpg
        ├── favicon/        Ícones (monograma HN)
        ├── frota/          Fotografias otimizadas (.webp)
        └── raw/            Originais (ignorado pelo Git)
```

## Conformidade legal (UE + Portugal)

Inclui os elementos exigidos para um site de empresa em Portugal:
identificação completa da sociedade (DL 7/2004 + CSC art. 171), Política de Privacidade (RGPD),
ligação visível para o **Livro de Reclamações** (`livroreclamacoes.pt`), aviso de **RAL** (CICAP)
e indicação do licenciamento **IMT**. Não inclui ligação para a plataforma ODR da UE (extinta em julho de 2025).

### A confirmar com o cliente antes da divulgação pública
- [ ] Nome exato da **Conservatória do Registo Comercial** (certidão permanente).
- [ ] **Número de alvará / licença IMT** (a acrescentar ao rodapé e aos Termos).
- [ ] Confirmar o email oficial em uso (site usa `info@hntransportes.pt`).

## Atualizar imagens

As fotografias são otimizadas para WebP com o _script_ `tools/build-images.py` (Pillow).
Coloque os originais em `assets/img/raw/` e ajuste o mapa de ficheiros no _script_.

## Desenvolvimento local

Como é um site estático, basta servir a pasta:

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```
