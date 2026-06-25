/* HN Transportes — i18n no lado do cliente (sem build).
   Idiomas: PT (pt-PT, por defeito), ES (es-ES), EN (en-US).
   Aplica traduções a [data-i18n] (innerHTML), [data-i18n-alt], [data-i18n-aria]
   e [data-i18n-content] (atributo content de <meta>). A escolha é guardada em
   localStorage; na 1.ª visita deteta o idioma do navegador só se não houver escolha. */
(function () {
  "use strict";

  var SUPPORTED = ["pt", "es", "en"];
  var LOCALE = { pt: "pt-PT", es: "es-ES", en: "en-US" };
  var STORE = "hn-lang";

  var DICT = {
    pt: {
      "a11y.skip": "Saltar para o conteúdo",
      "a11y.nav": "Navegação principal",
      "a11y.langs": "Idioma",

      "legal.home": "Início",
      "legal.back": "Voltar à página inicial",
      "legal.prevail": "Em caso de divergência entre versões, prevalece a versão em português.",

      "pp.metaTitle": "Política de Privacidade | HN Transportes",
      "pp.metaDesc": "Política de Privacidade da Hélder Nunes - Transportes, Unipessoal, Lda (HN Transportes), nos termos do RGPD.",
      "pp.crumb": "Política de Privacidade",
      "pp.h1": "Política de Privacidade",
      "pp.sub": "Como a HN Transportes recolhe, utiliza e protege os seus dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).",
      "pp.updated": "Última atualização: 25 de junho de 2026",
      "pp.s1h": "1. Responsável pelo tratamento",
      "pp.s1p1": "O responsável pelo tratamento dos dados pessoais é:",
      "pp.s1list": "<li><strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> (marca «HN Transportes»)</li><li>NIPC: 516490141</li><li>Sede: Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro</li><li>Email: <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · Telefone: <a href=\"tel:+351913310440\">+351 913 310 440</a> (Chamada para a rede móvel nacional)</li>",
      "pp.s1p2": "A empresa não está legalmente obrigada a designar um Encarregado de Proteção de Dados (DPO). Para qualquer questão sobre privacidade, utilize os contactos acima.",
      "pp.s2h": "2. Que dados tratamos e com que finalidade",
      "pp.s2p": "Este sítio é meramente informativo e <strong>não dispõe de formulário de contacto, nem de área de cliente, comércio eletrónico, publicidade ou sistemas de rastreamento</strong>. Os dados pessoais que tratamos resultam, essencialmente, do contacto que estabelece connosco:",
      "pp.s2table": "<thead><tr><th>Contexto</th><th>Dados</th><th>Finalidade</th></tr></thead><tbody><tr><td>Contacto por email, telefone ou WhatsApp</td><td>Nome, contacto (email/telefone) e o conteúdo da mensagem</td><td>Responder ao seu pedido, prestar informações e elaborar orçamentos de transporte</td></tr><tr><td>Prestação do serviço de transporte</td><td>Dados de recolha/entrega e de faturação</td><td>Executar o serviço contratado e cumprir obrigações legais e fiscais</td></tr><tr><td>Acesso ao sítio (alojamento)</td><td>Dados técnicos (ex.: endereço IP) registados pelo servidor</td><td>Garantir a disponibilidade e a segurança do sítio</td></tr></tbody>",
      "pp.s3h": "3. Fundamento jurídico",
      "pp.s3list": "<li><strong>Diligências pré-contratuais e execução de contrato</strong> (art. 6.º, n.º 1, al. b) do RGPD) — para responder a pedidos e prestar o serviço;</li><li><strong>Interesse legítimo</strong> (art. 6.º, n.º 1, al. f) — para responder a contactos e assegurar a segurança do sítio;</li><li><strong>Cumprimento de obrigações legais</strong> (art. 6.º, n.º 1, al. c) — designadamente obrigações fiscais e contabilísticas.</li>",
      "pp.s4h": "4. Prazo de conservação",
      "pp.s4p": "Os dados de contacto são conservados apenas pelo tempo necessário para responder ao seu pedido e gerir a eventual relação comercial. Os dados associados a serviços prestados e à faturação são conservados pelos prazos legais aplicáveis (designadamente os prazos fiscais e contabilísticos).",
      "pp.s5h": "5. Destinatários e subcontratantes",
      "pp.s5p": "Não vendemos nem cedemos os seus dados a terceiros para fins de marketing. Os dados poderão ser tratados por prestadores de serviços que atuam por nossa conta, nomeadamente o serviço de alojamento do sítio. Quando contacta através do WhatsApp, a comunicação é igualmente tratada pela Meta Platforms, nos termos da política de privacidade própria dessa plataforma. A página de contactos pode apresentar o Google Maps; o mapa só é carregado se aceitar os cookies, passando então o Google (Google Ireland Ltd / Google LLC) a tratar dados, incluindo o seu endereço IP, para apresentar o mapa.",
      "pp.s6h": "6. Transferências internacionais",
      "pp.s6p": "O sítio está alojado no serviço <strong>GitHub Pages</strong> (GitHub, Inc., EUA), pelo que dados técnicos de acesso podem ser tratados fora do Espaço Económico Europeu, ao abrigo de garantias adequadas previstas no RGPD (designadamente cláusulas contratuais-tipo e/ou mecanismos de adequação aplicáveis). O mesmo se aplica ao contacto via WhatsApp (Meta Platforms) e, caso aceite os cookies do mapa, ao Google Maps (Google), com transferência para os Estados Unidos ao abrigo de garantias adequadas.",
      "pp.s7h": "7. Os seus direitos",
      "pp.s7p": "Enquanto titular dos dados, pode exercer, a qualquer momento, os direitos de <strong>acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição</strong>. Para o efeito, contacte-nos através de <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a>. A sua identidade poderá ter de ser confirmada antes de darmos seguimento ao pedido.",
      "pp.s8h": "8. Reclamação à autoridade de controlo",
      "pp.s8p": "Sem prejuízo de outra via, tem o direito de apresentar reclamação à autoridade de controlo competente em Portugal — a <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>, <a href=\"https://www.cnpd.pt\" target=\"_blank\" rel=\"noopener\">www.cnpd.pt</a>.",
      "pp.s9h": "9. Decisões automatizadas",
      "pp.s9p": "Não são tomadas decisões individuais automatizadas, incluindo a definição de perfis, com base nos seus dados.",
      "pp.s10h": "10. Cookies",
      "pp.s10p": "Este sítio só utiliza cookies não essenciais (Google Maps) com o seu consentimento. Para mais detalhes, consulte a nossa <a href=\"cookies.html\">Política de Cookies</a>.",
      "pp.s11h": "11. Alterações",
      "pp.s11p": "Esta política pode ser atualizada sempre que necessário. A versão em vigor é a publicada nesta página, identificada pela data de última atualização indicada acima.",

      "ck.metaTitle": "Política de Cookies | HN Transportes",
      "ck.metaDesc": "Política de Cookies da HN Transportes. Por defeito não são instalados cookies; o único cookie não essencial (Google Maps) só é carregado com o seu consentimento.",
      "ck.crumb": "Política de Cookies",
      "ck.h1": "Política de Cookies",
      "ck.sub": "Informação sobre a utilização de cookies neste sítio, nos termos do artigo 5.º da Lei n.º 41/2004.",
      "ck.updated": "Última atualização: 25 de junho de 2026",
      "ck.s1h": "1. O que são cookies",
      "ck.s1p": "Os cookies são pequenos ficheiros de texto que um sítio pode guardar no seu dispositivo quando o visita. Servem, por exemplo, para recordar preferências, recolher estatísticas de utilização ou apresentar publicidade direcionada.",
      "ck.callout": "<strong>Só utilizamos cookies não essenciais com o seu consentimento.</strong> Por defeito, não é instalado qualquer cookie de terceiros. O único cookie não essencial provém do <strong>Google Maps</strong> e só é carregado se aceitar no banner de cookies. Pode alterar a sua escolha a qualquer momento em «Definições de cookies», no rodapé.",
      "ck.s2h": "2. Que cookies utilizamos",
      "ck.s2p": "Não usamos cookies de análise (analytics), de publicidade nem de redes sociais. As tipografias são alojadas no próprio sítio e não existem píxeis de rastreamento. O único tratamento que depende de cookies é o mapa de localização:",
      "ck.s2table": "<thead><tr><th>Serviço</th><th>Finalidade</th><th>Quando</th></tr></thead><tbody><tr><td>Google Maps (Google)</td><td>Apresentar o mapa interativo da nossa localização</td><td>Apenas após aceitar o banner de cookies</td></tr><tr><td>Preferência de consentimento</td><td>Recordar a sua escolha (aceitar/rejeitar) para não voltar a perguntar</td><td>Essencial — guardado apenas no seu navegador, não é partilhado</td></tr></tbody>",
      "ck.s3h": "3. Mapa de localização (Google Maps)",
      "ck.s3p": "A página de contactos pode apresentar um mapa do <strong>Google Maps</strong>. Por respeito pela sua privacidade, o mapa <strong>não é carregado até que aceite</strong> os cookies (no banner ou no botão «Aceitar e ver o mapa»). Enquanto não aceitar, nenhum cookie do Google é instalado. Ao aceitar, o Google (Google Ireland Ltd / Google LLC) pode instalar cookies e tratar dados — incluindo o seu endereço IP — nos termos da <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">política de privacidade do Google</a>. Pode retirar o consentimento a qualquer momento em «Definições de cookies».",
      "ck.s4h": "4. Ligações para sítios externos",
      "ck.s4p": "Quando clica em ligações para o WhatsApp, Facebook, Instagram, Google Maps ou para o Livro de Reclamações, é encaminhado para serviços de terceiros que têm as suas próprias políticas de cookies e de privacidade, pelas quais a HN Transportes não é responsável.",
      "ck.s5h": "5. Como gerir o seu consentimento e os cookies",
      "ck.s5p": "Pode aceitar ou rejeitar os cookies não essenciais no banner apresentado na primeira visita e alterar essa escolha quando quiser através de «Definições de cookies», no rodapé do site. Pode também, a qualquer momento, configurar o seu navegador (Chrome, Safari, Firefox, Edge, etc.) para bloquear ou eliminar cookies.",
      "ck.s6h": "6. Alterações",
      "ck.s6p": "Esta política pode ser atualizada sempre que necessário. A versão em vigor é a publicada nesta página, identificada pela data de última atualização indicada acima.",

      "tm.metaTitle": "Termos e Aviso Legal | HN Transportes",
      "tm.metaDesc": "Termos de utilização e aviso legal do sítio da HN Transportes — identificação da empresa, propriedade intelectual e resolução de litígios.",
      "tm.crumb": "Termos e Aviso Legal",
      "tm.h1": "Termos e Aviso Legal",
      "tm.sub": "Condições de utilização deste sítio e identificação legal da empresa, nos termos do Decreto-Lei n.º 7/2004 e do Código das Sociedades Comerciais.",
      "tm.updated": "Última atualização: 23 de junho de 2026",
      "tm.s1h": "1. Identificação",
      "tm.s1p": "O presente sítio é propriedade de:",
      "tm.s1list": "<li><strong>Denominação social:</strong> Hélder Nunes - Transportes, Unipessoal, Lda</li><li><strong>Marca comercial:</strong> HN Transportes</li><li><strong>NIPC / NIF:</strong> 516490141</li><li><strong>Sede:</strong> Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro, Portugal</li><li><strong>Capital social:</strong> 50.000,00 €</li><li><strong>Registo:</strong> Matriculada na Conservatória do Registo Comercial sob o n.º 516490141</li><li><strong>CAE:</strong> 49410 — Transportes rodoviários de mercadorias</li><li><strong>Atividade:</strong> licenciada e supervisionada pelo IMT, I.P. (Instituto da Mobilidade e dos Transportes)</li><li><strong>Contactos:</strong> <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · <a href=\"tel:+351913310440\">+351 913 310 440</a> (Chamada para a rede móvel nacional)</li>",
      "tm.s2h": "2. Objeto",
      "tm.s2p": "Este sítio tem natureza meramente informativa e destina-se a apresentar os serviços de transporte de mercadorias prestados pela HN Transportes. A consulta do sítio não constitui, por si só, qualquer relação contratual. Os serviços são contratados por contacto direto e formalizados nos termos acordados entre as partes.",
      "tm.s3h": "3. Propriedade intelectual",
      "tm.s3p": "O logótipo «HN Transportes», os textos, as imagens da frota e os demais conteúdos deste sítio são propriedade da Hélder Nunes - Transportes, Unipessoal, Lda ou são utilizados com autorização, estando protegidos pela legislação aplicável. Não é permitida a sua reprodução, distribuição ou utilização sem autorização prévia e por escrito.",
      "tm.s4h": "4. Limitação de responsabilidade",
      "tm.s4p": "Procuramos manter a informação deste sítio atualizada e correta. Contudo, a HN Transportes não se responsabiliza por eventuais imprecisões ou pela indisponibilidade temporária do sítio. As condições concretas de cada serviço (prazos, preços e demais termos) prevalecem sobre quaisquer indicações genéricas aqui apresentadas.",
      "tm.s5h": "5. Ligações para sítios de terceiros",
      "tm.s5p": "Este sítio contém ligações para plataformas de terceiros (WhatsApp, Facebook, Instagram, Google Maps e Livro de Reclamações). A HN Transportes não controla nem é responsável pelo conteúdo ou pelas políticas desses sítios.",
      "tm.s6h": "6. Livro de Reclamações",
      "tm.s6p1": "A HN Transportes dispõe de Livro de Reclamações. Pode apresentar uma reclamação através da plataforma digital em <a href=\"https://www.livroreclamacoes.pt\" target=\"_blank\" rel=\"noopener\">www.livroreclamacoes.pt</a>.",
      "tm.s6p2": "Entidade competente para apreciar reclamações no setor dos transportes: <strong>AMT — Autoridade da Mobilidade e dos Transportes</strong>, Av. António Augusto de Aguiar, n.º 128, 1050-020 Lisboa — <a href=\"mailto:reclamacoes@amt-autoridade.pt\">reclamacoes@amt-autoridade.pt</a>.",
      "tm.s7h": "7. Resolução alternativa de litígios de consumo",
      "tm.s7p": "Em caso de litígio de consumo, o consumidor pode recorrer à entidade de Resolução Alternativa de Litígios (RAL) territorialmente competente:",
      "tm.s7list": "<li><strong>CICAP — Tribunal Arbitral do Consumo</strong> (Centro de Informação de Consumo e Arbitragem do Porto) — <a href=\"https://www.cicap.pt\" target=\"_blank\" rel=\"noopener\">www.cicap.pt</a></li>",
      "tm.s7p2": "Mais informação sobre os direitos do consumidor em <a href=\"https://www.consumidor.gov.pt\" target=\"_blank\" rel=\"noopener\">www.consumidor.gov.pt</a>.",
      "tm.s8h": "8. Lei aplicável e foro",
      "tm.s8p": "Os presentes termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio emergente da utilização deste sítio é competente o foro da comarca da sede da empresa, sem prejuízo das regras imperativas aplicáveis aos consumidores.",
      "nav.servicos": "Serviços",
      "nav.sobre": "Sobre",
      "nav.frota": "Frota",
      "nav.cobertura": "Cobertura",
      "nav.contactos": "Contactos",
      "cta.quote": "Pedir orçamento",

      "hero.title": "O seu parceiro de <em>confiança</em> no transporte de mercadorias.",
      "hero.lead": "Recolhemos e entregamos a sua carga onde for preciso, com a rapidez que o seu negócio exige.",
      "hero.ligar": "Ligar",
      "hero.wa": "ou fale connosco no",
      "hero.panel.eyebrow": "Resposta imediata",
      "phone.note": "(Chamada para a rede móvel nacional)",
      "hero.img.alt": "Carrinha branca da HN Transportes estacionada junto a um farol ao pôr-do-sol",

      "serv.eyebrow": "O que fazemos",
      "serv.h2": "Um serviço para cada tipo de entrega",
      "serv.sub": "Do envio urgente à carga exclusiva, ajustamos o transporte ao que cada cliente precisa.",
      "serv.c1.t": "Transporte Expresso",
      "serv.c1.d": "Entregas urgentes com prioridade máxima e tempos de resposta mínimos para o que não pode esperar.",
      "serv.c2.t": "Serviço Dedicado",
      "serv.c2.d": "Uma carrinha exclusiva para a sua carga, do ponto de recolha ao destino, sem partilha de espaço.",
      "serv.c3.t": "Transporte Direto",
      "serv.c3.d": "Sem transbordos: a mercadoria nunca muda de veículo, reduzindo riscos e tempos de entrega.",
      "serv.c4.t": "Cargas até 1.200 kg",
      "serv.c4.d": "Carrinhas de caixa preparadas para volumes, paletes e mercadoria diversa com total segurança.",
      "serv.c5.t": "Disponível 24/7",
      "serv.c5.d": "Resposta imediata a urgências e imprevistos, 24 horas por dia, 7 dias por semana.",
      "serv.c6.t": "Nacional & Ibérico",
      "serv.c6.d": "Recolhas e entregas porta a porta em qualquer ponto de Portugal e Espanha.",

      "sobre.eyebrow": "Sobre a HN Transportes",
      "sobre.h2": "Uma equipa dedicada a entregar com rigor",
      "sobre.p1": "A <strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> nasceu em 2021, do trabalho de quem conhece bem a estrada. Desde então, ajudamos empresas e particulares a transportar as suas mercadorias com rapidez e total tranquilidade.",
      "sobre.p2": "Quando nos contacta, fala diretamente com quem trata da sua carga — sem intermediários nem centrais anónimas. É essa proximidade que nos permite responder depressa e acompanhar cada entrega, do primeiro contacto até ao destino.",
      "sobre.since": "Desde",
      "sobre.f1.t": "Rigor nos prazos",
      "sobre.f1.d": "Cumprimos os tempos de recolha e entrega que combinamos.",
      "sobre.f2.t": "Cuidado com cada carga",
      "sobre.f2.d": "Transporte direto e seguro, tratado como se fosse nosso.",
      "about.img.alt": "Equipa da HN Transportes junto à frota de carrinhas",

      "frota.eyebrow": "A nossa frota",
      "frota.h2": "A frota que vê na estrada",
      "frota.sub": "Veículos cuidados e identificados — a imagem que entregamos é a mesma que conduzimos.",
      "frota.cap1": "Vários veículos, uma equipa",
      "frota.cap2": "Identidade HN",
      "frota.cap3": "O nosso logótipo",
      "frota.cap4": "Por todo o país",
      "frota.cap5": "Entregas urbanas",
      "frota.cap6": "Onde for preciso",
      "frota.cap7": "Cobertura alargada",

      "cob.eyebrow": "Onde chegamos",
      "cob.h2": "De Cesar para toda a Península Ibérica",
      "cob.body": "A nossa sede em Cesar, Oliveira de Azeméis, tem ligação rápida às principais vias do país — uma posição central que nos deixa chegar depressa ao ponto de recolha e seguir sem desvios até ao destino.",
      "cob.chip1": "Portugal Continental",
      "cob.chip2": "Espanha",
      "cob.chip3": "Porta a porta",
      "cob.map.aria": "Rota da HN Transportes a ligar Portugal e Espanha",
      "cob.map.es": "Espanha",

      "con.eyebrow": "Contactos",
      "con.h2": "Falamos consigo de imediato",
      "con.sub": "Escolha o canal que preferir. Respondemos a qualquer hora, todos os dias.",
      "map.title": "Onde estamos",
      "map.note": "Para mostrar o mapa usamos o Google Maps, que instala cookies. Aceite para o ver aqui.",
      "map.accept": "Aceitar e ver o mapa",
      "map.hint": "Em alternativa, <a href=\"https://www.google.com/maps/search/?api=1&query=Rua%20da%20Gandara%20158%203700-607%20Cesar%20Oliveira%20de%20Azem%C3%A9is\" target=\"_blank\" rel=\"noopener\">abra no Google Maps</a>.",
      "ch.tel": "Telefone",
      "ch.email": "Email",
      "ch.morada": "Morada",
      "con.dir": "Como chegar",

      "footer.blurb": "Transporte de mercadorias por todo o Portugal e Espanha, com a confiança de quem trata a sua carga como sua.",
      "footer.contactos": "Contactos",
      "footer.local": "Cesar, Oliveira de Azeméis",
      "footer.lr.sub": "Reclamação online em livroreclamacoes.pt",
      "footer.rights": "Todos os direitos reservados.",
      "footer.priv": "Política de Privacidade",
      "footer.cookies": "Política de Cookies",
      "footer.termos": "Termos e Aviso Legal",
      "footer.cookieset": "Definições de cookies",

      "cookie.txt": "Utilizamos cookies do <strong>Google Maps</strong> apenas para mostrar o mapa da nossa localização. Pode aceitar ou rejeitar — o site funciona na mesma. Saiba mais na <a href=\"cookies.html\">Política de Cookies</a>.",
      "cookie.reject": "Rejeitar",
      "cookie.accept": "Aceitar",

      "a11y.lightbox": "Visualizador de imagens",
      "a11y.close": "Fechar",
      "a11y.prev": "Anterior",
      "a11y.next": "Seguinte",
      "a11y.totop": "Voltar ao topo",
      "a11y.wa": "Falar no WhatsApp",

      "metaTitle.index": "HN Transportes | Transporte de mercadorias 24/7 — Nacional e Ibérico",
      "metaDesc.index": "HN Transportes (Hélder Nunes) — transporte de mercadorias em carrinhas de caixa com carga útil até 1.200 kg. Serviços expresso, dedicados e diretos, sem transbordos, 24 horas por dia, a nível nacional e ibérico. Sede em Cesar, Oliveira de Azeméis."
    },

    es: {
      "a11y.skip": "Saltar al contenido",
      "a11y.nav": "Navegación principal",
      "a11y.langs": "Idioma",

      "legal.home": "Inicio",
      "legal.back": "Volver a la página de inicio",
      "legal.prevail": "En caso de discrepancia entre versiones, prevalece la versión en portugués.",

      "pp.metaTitle": "Política de Privacidad | HN Transportes",
      "pp.metaDesc": "Política de Privacidad de Hélder Nunes - Transportes, Unipessoal, Lda (HN Transportes), conforme al RGPD.",
      "pp.crumb": "Política de Privacidad",
      "pp.h1": "Política de Privacidad",
      "pp.sub": "Cómo HN Transportes recoge, utiliza y protege sus datos personales, de acuerdo con el Reglamento General de Protección de Datos (RGPD).",
      "pp.updated": "Última actualización: 25 de junio de 2026",
      "pp.s1h": "1. Responsable del tratamiento",
      "pp.s1p1": "El responsable del tratamiento de los datos personales es:",
      "pp.s1list": "<li><strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> (marca «HN Transportes»)</li><li>NIPC: 516490141</li><li>Sede: Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro</li><li>Email: <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · Teléfono: <a href=\"tel:+351913310440\">+351 913 310 440</a> (Llamada a red móvil nacional)</li>",
      "pp.s1p2": "La empresa no está legalmente obligada a designar un Delegado de Protección de Datos (DPD). Para cualquier cuestión sobre privacidad, utilice los contactos indicados arriba.",
      "pp.s2h": "2. Qué datos tratamos y con qué finalidad",
      "pp.s2p": "Este sitio es meramente informativo y <strong>no dispone de formulario de contacto, ni de área de cliente, comercio electrónico, publicidad o sistemas de rastreo</strong>. Los datos personales que tratamos resultan, esencialmente, del contacto que establece con nosotros:",
      "pp.s2table": "<thead><tr><th>Contexto</th><th>Datos</th><th>Finalidad</th></tr></thead><tbody><tr><td>Contacto por email, teléfono o WhatsApp</td><td>Nombre, contacto (email/teléfono) y el contenido del mensaje</td><td>Responder a su solicitud, facilitar información y elaborar presupuestos de transporte</td></tr><tr><td>Prestación del servicio de transporte</td><td>Datos de recogida/entrega y de facturación</td><td>Ejecutar el servicio contratado y cumplir obligaciones legales y fiscales</td></tr><tr><td>Acceso al sitio (alojamiento)</td><td>Datos técnicos (p. ej.: dirección IP) registrados por el servidor</td><td>Garantizar la disponibilidad y la seguridad del sitio</td></tr></tbody>",
      "pp.s3h": "3. Base jurídica",
      "pp.s3list": "<li><strong>Diligencias precontractuales y ejecución de contrato</strong> (art. 6.º, n.º 1, letra b) del RGPD) — para responder a solicitudes y prestar el servicio;</li><li><strong>Interés legítimo</strong> (art. 6.º, n.º 1, letra f) — para responder a contactos y garantizar la seguridad del sitio;</li><li><strong>Cumplimiento de obligaciones legales</strong> (art. 6.º, n.º 1, letra c) — en particular obligaciones fiscales y contables.</li>",
      "pp.s4h": "4. Plazo de conservación",
      "pp.s4p": "Los datos de contacto se conservan únicamente durante el tiempo necesario para responder a su solicitud y gestionar la eventual relación comercial. Los datos asociados a servicios prestados y a la facturación se conservan durante los plazos legales aplicables (en particular los plazos fiscales y contables).",
      "pp.s5h": "5. Destinatarios y subcontratistas",
      "pp.s5p": "No vendemos ni cedemos sus datos a terceros con fines de marketing. Los datos podrán ser tratados por prestadores de servicios que actúan por nuestra cuenta, en particular el servicio de alojamiento del sitio. Cuando contacta a través de WhatsApp, la comunicación es igualmente tratada por Meta Platforms, conforme a la política de privacidad propia de esa plataforma. La página de contacto puede mostrar Google Maps; el mapa solo se carga si acepta las cookies, pasando entonces Google (Google Ireland Ltd / Google LLC) a tratar datos, incluida su dirección IP, para mostrar el mapa.",
      "pp.s6h": "6. Transferencias internacionales",
      "pp.s6p": "El sitio está alojado en el servicio <strong>GitHub Pages</strong> (GitHub, Inc., EE. UU.), por lo que datos técnicos de acceso pueden tratarse fuera del Espacio Económico Europeo, al amparo de garantías adecuadas previstas en el RGPD (en particular cláusulas contractuales tipo y/o mecanismos de adecuación aplicables). Lo mismo se aplica al contacto vía WhatsApp (Meta Platforms) y, si acepta las cookies del mapa, a Google Maps (Google), con transferencia a los Estados Unidos al amparo de garantías adecuadas.",
      "pp.s7h": "7. Sus derechos",
      "pp.s7p": "Como titular de los datos, puede ejercer, en cualquier momento, los derechos de <strong>acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición</strong>. Para ello, contáctenos a través de <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a>. Su identidad podrá tener que confirmarse antes de dar curso a la solicitud.",
      "pp.s8h": "8. Reclamación ante la autoridad de control",
      "pp.s8p": "Sin perjuicio de otra vía, tiene derecho a presentar una reclamación ante la autoridad de control competente en Portugal — la <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>, <a href=\"https://www.cnpd.pt\" target=\"_blank\" rel=\"noopener\">www.cnpd.pt</a>.",
      "pp.s9h": "9. Decisiones automatizadas",
      "pp.s9p": "No se toman decisiones individuales automatizadas, incluida la elaboración de perfiles, basadas en sus datos.",
      "pp.s10h": "10. Cookies",
      "pp.s10p": "Este sitio solo utiliza cookies no esenciales (Google Maps) con su consentimiento. Para más detalles, consulte nuestra <a href=\"cookies.html\">Política de Cookies</a>.",
      "pp.s11h": "11. Cambios",
      "pp.s11p": "Esta política puede actualizarse siempre que sea necesario. La versión en vigor es la publicada en esta página, identificada por la fecha de última actualización indicada arriba.",

      "ck.metaTitle": "Política de Cookies | HN Transportes",
      "ck.metaDesc": "Política de Cookies de HN Transportes. Por defecto no se instalan cookies; la única cookie no esencial (Google Maps) solo se carga con su consentimiento.",
      "ck.crumb": "Política de Cookies",
      "ck.h1": "Política de Cookies",
      "ck.sub": "Información sobre el uso de cookies en este sitio, conforme al artículo 5.º de la Lei n.º 41/2004.",
      "ck.updated": "Última actualización: 25 de junio de 2026",
      "ck.s1h": "1. Qué son las cookies",
      "ck.s1p": "Las cookies son pequeños archivos de texto que un sitio puede guardar en su dispositivo cuando lo visita. Sirven, por ejemplo, para recordar preferencias, recoger estadísticas de uso o mostrar publicidad dirigida.",
      "ck.callout": "<strong>Solo utilizamos cookies no esenciales con su consentimiento.</strong> Por defecto, no se instala ninguna cookie de terceros. La única cookie no esencial proviene de <strong>Google Maps</strong> y solo se carga si acepta en el banner de cookies. Puede cambiar su elección en cualquier momento en «Configuración de cookies», en el pie de página.",
      "ck.s2h": "2. Qué cookies utilizamos",
      "ck.s2p": "No usamos cookies de análisis (analytics), de publicidad ni de redes sociales. Las tipografías están alojadas en el propio sitio y no existen píxeles de rastreo. El único tratamiento que depende de cookies es el mapa de localización:",
      "ck.s2table": "<thead><tr><th>Servicio</th><th>Finalidad</th><th>Cuándo</th></tr></thead><tbody><tr><td>Google Maps (Google)</td><td>Mostrar el mapa interactivo de nuestra ubicación</td><td>Solo tras aceptar el banner de cookies</td></tr><tr><td>Preferencia de consentimiento</td><td>Recordar su elección (aceptar/rechazar) para no volver a preguntar</td><td>Esencial — guardada solo en su navegador, no se comparte</td></tr></tbody>",
      "ck.s3h": "3. Mapa de localización (Google Maps)",
      "ck.s3p": "La página de contacto puede mostrar un mapa de <strong>Google Maps</strong>. Por respeto a su privacidad, el mapa <strong>no se carga hasta que acepte</strong> las cookies (en el banner o en el botón «Aceptar y ver el mapa»). Mientras no acepte, no se instala ninguna cookie de Google. Al aceptar, Google (Google Ireland Ltd / Google LLC) puede instalar cookies y tratar datos — incluida su dirección IP — conforme a la <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">política de privacidad de Google</a>. Puede retirar el consentimiento en cualquier momento en «Configuración de cookies».",
      "ck.s4h": "4. Enlaces a sitios externos",
      "ck.s4p": "Cuando hace clic en enlaces a WhatsApp, Facebook, Instagram, Google Maps o al Livro de Reclamações, se le redirige a servicios de terceros que tienen sus propias políticas de cookies y de privacidad, de las que HN Transportes no es responsable.",
      "ck.s5h": "5. Cómo gestionar su consentimiento y las cookies",
      "ck.s5p": "Puede aceptar o rechazar las cookies no esenciales en el banner mostrado en la primera visita y cambiar esa elección cuando quiera a través de «Configuración de cookies», en el pie del sitio. También puede, en cualquier momento, configurar su navegador (Chrome, Safari, Firefox, Edge, etc.) para bloquear o eliminar cookies.",
      "ck.s6h": "6. Cambios",
      "ck.s6p": "Esta política puede actualizarse siempre que sea necesario. La versión en vigor es la publicada en esta página, identificada por la fecha de última actualización indicada arriba.",

      "tm.metaTitle": "Términos y Aviso Legal | HN Transportes",
      "tm.metaDesc": "Términos de uso y aviso legal del sitio de HN Transportes — identificación de la empresa, propiedad intelectual y resolución de litigios.",
      "tm.crumb": "Términos y Aviso Legal",
      "tm.h1": "Términos y Aviso Legal",
      "tm.sub": "Condiciones de uso de este sitio e identificación legal de la empresa, conforme al Decreto-Lei n.º 7/2004 y al Código das Sociedades Comerciais.",
      "tm.updated": "Última actualización: 23 de junio de 2026",
      "tm.s1h": "1. Identificación",
      "tm.s1p": "El presente sitio es propiedad de:",
      "tm.s1list": "<li><strong>Denominación social:</strong> Hélder Nunes - Transportes, Unipessoal, Lda</li><li><strong>Marca comercial:</strong> HN Transportes</li><li><strong>NIPC / NIF:</strong> 516490141</li><li><strong>Sede:</strong> Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro, Portugal</li><li><strong>Capital social:</strong> 50.000,00 €</li><li><strong>Registro:</strong> Inscrita en la Conservatória do Registo Comercial con el n.º 516490141</li><li><strong>CAE:</strong> 49410 — Transporte de mercancías por carretera</li><li><strong>Actividad:</strong> autorizada y supervisada por el IMT, I.P. (Instituto da Mobilidade e dos Transportes)</li><li><strong>Contacto:</strong> <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · <a href=\"tel:+351913310440\">+351 913 310 440</a> (Llamada a red móvil nacional)</li>",
      "tm.s2h": "2. Objeto",
      "tm.s2p": "Este sitio tiene naturaleza meramente informativa y está destinado a presentar los servicios de transporte de mercancías prestados por HN Transportes. La consulta del sitio no constituye, por sí sola, ninguna relación contractual. Los servicios se contratan por contacto directo y se formalizan en los términos acordados entre las partes.",
      "tm.s3h": "3. Propiedad intelectual",
      "tm.s3p": "El logotipo «HN Transportes», los textos, las imágenes de la flota y los demás contenidos de este sitio son propiedad de Hélder Nunes - Transportes, Unipessoal, Lda o se utilizan con autorización, estando protegidos por la legislación aplicable. No se permite su reproducción, distribución o uso sin autorización previa y por escrito.",
      "tm.s4h": "4. Limitación de responsabilidad",
      "tm.s4p": "Procuramos mantener la información de este sitio actualizada y correcta. No obstante, HN Transportes no se responsabiliza de eventuales imprecisiones ni de la indisponibilidad temporal del sitio. Las condiciones concretas de cada servicio (plazos, precios y demás términos) prevalecen sobre cualesquiera indicaciones genéricas aquí presentadas.",
      "tm.s5h": "5. Enlaces a sitios de terceros",
      "tm.s5p": "Este sitio contiene enlaces a plataformas de terceros (WhatsApp, Facebook, Instagram, Google Maps y Livro de Reclamações). HN Transportes no controla ni es responsable del contenido o de las políticas de esos sitios.",
      "tm.s6h": "6. Livro de Reclamações",
      "tm.s6p1": "HN Transportes dispone de Livro de Reclamações. Puede presentar una reclamación a través de la plataforma digital en <a href=\"https://www.livroreclamacoes.pt\" target=\"_blank\" rel=\"noopener\">www.livroreclamacoes.pt</a>.",
      "tm.s6p2": "Entidad competente para examinar reclamaciones en el sector del transporte: <strong>AMT — Autoridade da Mobilidade e dos Transportes</strong>, Av. António Augusto de Aguiar, n.º 128, 1050-020 Lisboa — <a href=\"mailto:reclamacoes@amt-autoridade.pt\">reclamacoes@amt-autoridade.pt</a>.",
      "tm.s7h": "7. Resolución alternativa de litigios de consumo",
      "tm.s7p": "En caso de litigio de consumo, el consumidor puede recurrir a la entidad de Resolución Alternativa de Litigios (RAL) territorialmente competente:",
      "tm.s7list": "<li><strong>CICAP — Tribunal Arbitral do Consumo</strong> (Centro de Informação de Consumo e Arbitragem do Porto) — <a href=\"https://www.cicap.pt\" target=\"_blank\" rel=\"noopener\">www.cicap.pt</a></li>",
      "tm.s7p2": "Más información sobre los derechos del consumidor en <a href=\"https://www.consumidor.gov.pt\" target=\"_blank\" rel=\"noopener\">www.consumidor.gov.pt</a>.",
      "tm.s8h": "8. Ley aplicable y fuero",
      "tm.s8p": "Los presentes términos se rigen por la ley portuguesa. Para la resolución de cualquier litigio derivado del uso de este sitio es competente el fuero de la comarca de la sede de la empresa, sin perjuicio de las normas imperativas aplicables a los consumidores.",
      "nav.servicos": "Servicios",
      "nav.sobre": "Nosotros",
      "nav.frota": "Flota",
      "nav.cobertura": "Cobertura",
      "nav.contactos": "Contacto",
      "cta.quote": "Pedir presupuesto",

      "hero.title": "Su socio de <em>confianza</em> en el transporte de mercancías.",
      "hero.lead": "Recogemos y entregamos su carga allí donde la necesite, con la rapidez que su negocio exige.",
      "hero.ligar": "Llamar",
      "hero.wa": "o hable con nosotros por",
      "hero.panel.eyebrow": "Respuesta inmediata",
      "phone.note": "(Llamada a red móvil nacional)",
      "hero.img.alt": "Furgoneta blanca de HN Transportes estacionada junto a un faro al atardecer",

      "serv.eyebrow": "Qué hacemos",
      "serv.h2": "Un servicio para cada tipo de entrega",
      "serv.sub": "Del envío urgente a la carga exclusiva, adaptamos el transporte a lo que cada cliente necesita.",
      "serv.c1.t": "Transporte exprés",
      "serv.c1.d": "Entregas urgentes con máxima prioridad y tiempos de respuesta mínimos para lo que no puede esperar.",
      "serv.c2.t": "Servicio dedicado",
      "serv.c2.d": "Una furgoneta exclusiva para su carga, desde la recogida hasta el destino, sin compartir espacio.",
      "serv.c3.t": "Transporte directo",
      "serv.c3.d": "Sin transbordos: la mercancía nunca cambia de vehículo, reduciendo riesgos y plazos de entrega.",
      "serv.c4.t": "Cargas hasta 1.200 kg",
      "serv.c4.d": "Furgonetas de caja preparadas para bultos, palés y mercancía diversa con total seguridad.",
      "serv.c5.t": "Disponible 24/7",
      "serv.c5.d": "Respuesta inmediata ante urgencias e imprevistos, 24 horas al día, 7 días a la semana.",
      "serv.c6.t": "Nacional e ibérico",
      "serv.c6.d": "Recogidas y entregas puerta a puerta en cualquier punto de Portugal y España.",

      "sobre.eyebrow": "Sobre HN Transportes",
      "sobre.h2": "Un equipo dedicado a entregar con rigor",
      "sobre.p1": "<strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> nació en 2021, del trabajo de quien conoce bien la carretera. Desde entonces, ayudamos a empresas y particulares a transportar sus mercancías con rapidez y total tranquilidad.",
      "sobre.p2": "Cuando nos contacta, habla directamente con quien se ocupa de su carga, sin intermediarios ni centralitas anónimas. Es esa cercanía la que nos permite responder rápido y acompañar cada entrega, desde el primer contacto hasta el destino.",
      "sobre.since": "Desde",
      "sobre.f1.t": "Rigor en los plazos",
      "sobre.f1.d": "Cumplimos los plazos de recogida y entrega acordados.",
      "sobre.f2.t": "Cuidado con cada carga",
      "sobre.f2.d": "Transporte directo y seguro, tratado como si fuera nuestro.",
      "about.img.alt": "Equipo de HN Transportes junto a la flota de furgonetas",

      "frota.eyebrow": "Nuestra flota",
      "frota.h2": "La flota que ve en la carretera",
      "frota.sub": "Vehículos cuidados e identificados: la imagen que entregamos es la misma que conducimos.",
      "frota.cap1": "Varios vehículos, un equipo",
      "frota.cap2": "Identidad HN",
      "frota.cap3": "Nuestro logotipo",
      "frota.cap4": "Por todo el país",
      "frota.cap5": "Entregas urbanas",
      "frota.cap6": "Donde haga falta",
      "frota.cap7": "Cobertura amplia",

      "cob.eyebrow": "Hasta dónde llegamos",
      "cob.h2": "Desde Cesar a toda la Península Ibérica",
      "cob.body": "Nuestra sede en Cesar, Oliveira de Azeméis, tiene conexión rápida con las principales vías del país: una posición central que nos permite llegar pronto al punto de recogida y seguir sin desvíos hasta el destino.",
      "cob.chip1": "Portugal continental",
      "cob.chip2": "España",
      "cob.chip3": "Puerta a puerta",
      "cob.map.aria": "Ruta de HN Transportes que conecta Portugal y España",
      "cob.map.es": "España",

      "con.eyebrow": "Contacto",
      "con.h2": "Hablamos con usted de inmediato",
      "con.sub": "Elija el canal que prefiera. Respondemos a cualquier hora, todos los días.",
      "map.title": "Dónde estamos",
      "map.note": "Para mostrar el mapa usamos Google Maps, que instala cookies. Acepte para verlo aquí.",
      "map.accept": "Aceptar y ver el mapa",
      "map.hint": "También puede <a href=\"https://www.google.com/maps/search/?api=1&query=Rua%20da%20Gandara%20158%203700-607%20Cesar%20Oliveira%20de%20Azem%C3%A9is\" target=\"_blank\" rel=\"noopener\">abrirlo en Google Maps</a>.",
      "ch.tel": "Teléfono",
      "ch.email": "Email",
      "ch.morada": "Dirección",
      "con.dir": "Cómo llegar",

      "footer.blurb": "Transporte de mercancías por todo Portugal y España, con la confianza de quien trata su carga como propia.",
      "footer.contactos": "Contacto",
      "footer.local": "Cesar, Oliveira de Azeméis",
      "footer.lr.sub": "Reclamación online en livroreclamacoes.pt",
      "footer.rights": "Todos los derechos reservados.",
      "footer.priv": "Política de Privacidad",
      "footer.cookies": "Política de Cookies",
      "footer.termos": "Términos y Aviso Legal",
      "footer.cookieset": "Configuración de cookies",

      "cookie.txt": "Utilizamos cookies de <strong>Google Maps</strong> únicamente para mostrar el mapa de nuestra ubicación. Puede aceptar o rechazar — el sitio funciona igual. Más información en la <a href=\"cookies.html\">Política de Cookies</a>.",
      "cookie.reject": "Rechazar",
      "cookie.accept": "Aceptar",

      "a11y.lightbox": "Visor de imágenes",
      "a11y.close": "Cerrar",
      "a11y.prev": "Anterior",
      "a11y.next": "Siguiente",
      "a11y.totop": "Volver arriba",
      "a11y.wa": "Hablar por WhatsApp",

      "metaTitle.index": "HN Transportes | Transporte de mercancías 24/7 — Nacional e ibérico",
      "metaDesc.index": "HN Transportes (Hélder Nunes) — transporte de mercancías en furgonetas de caja con carga útil hasta 1.200 kg. Servicios exprés, dedicados y directos, sin transbordos, 24 horas al día, a nivel nacional e ibérico. Sede en Cesar, Oliveira de Azeméis."
    },

    en: {
      "a11y.skip": "Skip to content",
      "a11y.nav": "Main navigation",
      "a11y.langs": "Language",

      "legal.home": "Home",
      "legal.back": "Back to home page",
      "legal.prevail": "In the event of any discrepancy between versions, the Portuguese version prevails.",

      "pp.metaTitle": "Privacy Policy | HN Transportes",
      "pp.metaDesc": "Privacy Policy of Hélder Nunes - Transportes, Unipessoal, Lda (HN Transportes), under the RGPD (GDPR).",
      "pp.crumb": "Privacy Policy",
      "pp.h1": "Privacy Policy",
      "pp.sub": "How HN Transportes collects, uses and protects your personal data, in accordance with the General Data Protection Regulation (RGPD / GDPR).",
      "pp.updated": "Last updated: 25 June 2026",
      "pp.s1h": "1. Data controller",
      "pp.s1p1": "The controller of your personal data is:",
      "pp.s1list": "<li><strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> (brand «HN Transportes»)</li><li>NIPC: 516490141</li><li>Registered office: Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro</li><li>Email: <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · Phone: <a href=\"tel:+351913310440\">+351 913 310 440</a> (Call to a national mobile network)</li>",
      "pp.s1p2": "The company is not legally required to appoint a Data Protection Officer (DPO). For any privacy matter, please use the contacts above.",
      "pp.s2h": "2. What data we process and for what purpose",
      "pp.s2p": "This site is purely informational and <strong>has no contact form, customer area, e-commerce, advertising or tracking systems</strong>. The personal data we process essentially result from the contact you make with us:",
      "pp.s2table": "<thead><tr><th>Context</th><th>Data</th><th>Purpose</th></tr></thead><tbody><tr><td>Contact by email, phone or WhatsApp</td><td>Name, contact (email/phone) and the content of the message</td><td>Respond to your request, provide information and prepare transport quotes</td></tr><tr><td>Provision of the transport service</td><td>Pickup/delivery and billing data</td><td>Perform the contracted service and comply with legal and tax obligations</td></tr><tr><td>Access to the site (hosting)</td><td>Technical data (e.g. IP address) logged by the server</td><td>Ensure the availability and security of the site</td></tr></tbody>",
      "pp.s3h": "3. Legal basis",
      "pp.s3list": "<li><strong>Pre-contractual steps and performance of a contract</strong> (Art. 6(1)(b) RGPD) — to respond to requests and provide the service;</li><li><strong>Legitimate interest</strong> (Art. 6(1)(f)) — to respond to contacts and ensure the security of the site;</li><li><strong>Compliance with legal obligations</strong> (Art. 6(1)(c)) — in particular tax and accounting obligations.</li>",
      "pp.s4h": "4. Retention period",
      "pp.s4p": "Contact data are kept only for as long as necessary to respond to your request and manage any business relationship. Data associated with services provided and with billing are kept for the applicable legal periods (in particular tax and accounting periods).",
      "pp.s5h": "5. Recipients and processors",
      "pp.s5p": "We do not sell or share your data with third parties for marketing purposes. Data may be processed by service providers acting on our behalf, in particular the site hosting service. When you contact us via WhatsApp, the communication is also processed by Meta Platforms, under that platform's own privacy policy. The contact page may display Google Maps; the map is only loaded if you accept cookies, after which Google (Google Ireland Ltd / Google LLC) processes data, including your IP address, to display the map.",
      "pp.s6h": "6. International transfers",
      "pp.s6p": "The site is hosted on <strong>GitHub Pages</strong> (GitHub, Inc., USA), so technical access data may be processed outside the European Economic Area, under appropriate safeguards provided for in the RGPD (in particular standard contractual clauses and/or applicable adequacy mechanisms). The same applies to contact via WhatsApp (Meta Platforms) and, if you accept the map cookies, to Google Maps (Google), with transfer to the United States under appropriate safeguards.",
      "pp.s7h": "7. Your rights",
      "pp.s7p": "As the data subject, you may exercise, at any time, the rights of <strong>access, rectification, erasure, restriction of processing, portability and objection</strong>. To do so, contact us at <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a>. Your identity may need to be confirmed before we act on the request.",
      "pp.s8h": "8. Complaint to the supervisory authority",
      "pp.s8p": "Without prejudice to any other means, you have the right to lodge a complaint with the competent supervisory authority in Portugal — the <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>, <a href=\"https://www.cnpd.pt\" target=\"_blank\" rel=\"noopener\">www.cnpd.pt</a>.",
      "pp.s9h": "9. Automated decisions",
      "pp.s9p": "No automated individual decisions, including profiling, are made based on your data.",
      "pp.s10h": "10. Cookies",
      "pp.s10p": "This site only uses non-essential cookies (Google Maps) with your consent. For more details, see our <a href=\"cookies.html\">Cookie Policy</a>.",
      "pp.s11h": "11. Changes",
      "pp.s11p": "This policy may be updated whenever necessary. The version in force is the one published on this page, identified by the last updated date shown above.",

      "ck.metaTitle": "Cookie Policy | HN Transportes",
      "ck.metaDesc": "HN Transportes Cookie Policy. By default no cookies are installed; the only non-essential cookie (Google Maps) is loaded only with your consent.",
      "ck.crumb": "Cookie Policy",
      "ck.h1": "Cookie Policy",
      "ck.sub": "Information about the use of cookies on this site, under Article 5 of Lei n.º 41/2004.",
      "ck.updated": "Last updated: 25 June 2026",
      "ck.s1h": "1. What cookies are",
      "ck.s1p": "Cookies are small text files that a site may store on your device when you visit it. They are used, for example, to remember preferences, collect usage statistics or display targeted advertising.",
      "ck.callout": "<strong>We only use non-essential cookies with your consent.</strong> By default, no third-party cookie is installed. The only non-essential cookie comes from <strong>Google Maps</strong> and is only loaded if you accept it in the cookie banner. You can change your choice at any time under «Cookie settings» in the footer.",
      "ck.s2h": "2. Which cookies we use",
      "ck.s2p": "We do not use analytics, advertising or social media cookies. Fonts are hosted on the site itself and there are no tracking pixels. The only processing that depends on cookies is the location map:",
      "ck.s2table": "<thead><tr><th>Service</th><th>Purpose</th><th>When</th></tr></thead><tbody><tr><td>Google Maps (Google)</td><td>Display the interactive map of our location</td><td>Only after accepting the cookie banner</td></tr><tr><td>Consent preference</td><td>Remember your choice (accept/reject) so we don't ask again</td><td>Essential — stored only in your browser, not shared</td></tr></tbody>",
      "ck.s3h": "3. Location map (Google Maps)",
      "ck.s3p": "The contact page may display a <strong>Google Maps</strong> map. Out of respect for your privacy, the map <strong>is not loaded until you accept</strong> cookies (in the banner or via the «Accept and view the map» button). Until you accept, no Google cookie is installed. When you accept, Google (Google Ireland Ltd / Google LLC) may install cookies and process data — including your IP address — under <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Google's privacy policy</a>. You can withdraw consent at any time under «Cookie settings».",
      "ck.s4h": "4. Links to external sites",
      "ck.s4p": "When you click links to WhatsApp, Facebook, Instagram, Google Maps or the Livro de Reclamações, you are directed to third-party services that have their own cookie and privacy policies, for which HN Transportes is not responsible.",
      "ck.s5h": "5. How to manage your consent and cookies",
      "ck.s5p": "You can accept or reject non-essential cookies in the banner shown on your first visit and change that choice whenever you wish via «Cookie settings» in the site footer. You can also, at any time, configure your browser (Chrome, Safari, Firefox, Edge, etc.) to block or delete cookies.",
      "ck.s6h": "6. Changes",
      "ck.s6p": "This policy may be updated whenever necessary. The version in force is the one published on this page, identified by the last updated date shown above.",

      "tm.metaTitle": "Terms & Legal Notice | HN Transportes",
      "tm.metaDesc": "Terms of use and legal notice for the HN Transportes website — company identification, intellectual property and dispute resolution.",
      "tm.crumb": "Terms & Legal Notice",
      "tm.h1": "Terms & Legal Notice",
      "tm.sub": "Conditions of use of this site and legal identification of the company, under Decreto-Lei n.º 7/2004 and the Código das Sociedades Comerciais.",
      "tm.updated": "Last updated: 23 June 2026",
      "tm.s1h": "1. Identification",
      "tm.s1p": "This site is owned by:",
      "tm.s1list": "<li><strong>Company name:</strong> Hélder Nunes - Transportes, Unipessoal, Lda</li><li><strong>Trade name:</strong> HN Transportes</li><li><strong>NIPC / NIF:</strong> 516490141</li><li><strong>Registered office:</strong> Rua da Gandara 158, 3700-607 Cesar, Oliveira de Azeméis, Aveiro, Portugal</li><li><strong>Share capital:</strong> €50,000.00</li><li><strong>Registration:</strong> Registered at the Conservatória do Registo Comercial under no. 516490141</li><li><strong>CAE:</strong> 49410 — Road freight transport</li><li><strong>Activity:</strong> licensed and supervised by IMT, I.P. (Instituto da Mobilidade e dos Transportes)</li><li><strong>Contact:</strong> <a href=\"mailto:info@hntransportes.pt\">info@hntransportes.pt</a> · <a href=\"tel:+351913310440\">+351 913 310 440</a> (Call to a national mobile network)</li>",
      "tm.s2h": "2. Purpose",
      "tm.s2p": "This site is purely informational and is intended to present the goods transport services provided by HN Transportes. Browsing the site does not, in itself, constitute any contractual relationship. Services are contracted by direct contact and formalised under the terms agreed between the parties.",
      "tm.s3h": "3. Intellectual property",
      "tm.s3p": "The «HN Transportes» logo, the texts, the fleet images and the other content of this site are the property of Hélder Nunes - Transportes, Unipessoal, Lda or are used with authorisation, being protected by applicable law. Their reproduction, distribution or use is not permitted without prior written authorisation.",
      "tm.s4h": "4. Limitation of liability",
      "tm.s4p": "We strive to keep the information on this site up to date and accurate. However, HN Transportes is not liable for any inaccuracies or for the temporary unavailability of the site. The specific conditions of each service (deadlines, prices and other terms) prevail over any generic indications presented here.",
      "tm.s5h": "5. Links to third-party sites",
      "tm.s5p": "This site contains links to third-party platforms (WhatsApp, Facebook, Instagram, Google Maps and the Livro de Reclamações). HN Transportes does not control and is not responsible for the content or policies of those sites.",
      "tm.s6h": "6. Livro de Reclamações",
      "tm.s6p1": "HN Transportes has a Livro de Reclamações (complaints book). You can file a complaint through the digital platform at <a href=\"https://www.livroreclamacoes.pt\" target=\"_blank\" rel=\"noopener\">www.livroreclamacoes.pt</a>.",
      "tm.s6p2": "Authority competent to examine complaints in the transport sector: <strong>AMT — Autoridade da Mobilidade e dos Transportes</strong>, Av. António Augusto de Aguiar, n.º 128, 1050-020 Lisboa — <a href=\"mailto:reclamacoes@amt-autoridade.pt\">reclamacoes@amt-autoridade.pt</a>.",
      "tm.s7h": "7. Alternative consumer dispute resolution",
      "tm.s7p": "In the event of a consumer dispute, the consumer may turn to the territorially competent Alternative Dispute Resolution (RAL) entity:",
      "tm.s7list": "<li><strong>CICAP — Tribunal Arbitral do Consumo</strong> (Centro de Informação de Consumo e Arbitragem do Porto) — <a href=\"https://www.cicap.pt\" target=\"_blank\" rel=\"noopener\">www.cicap.pt</a></li>",
      "tm.s7p2": "More information on consumer rights at <a href=\"https://www.consumidor.gov.pt\" target=\"_blank\" rel=\"noopener\">www.consumidor.gov.pt</a>.",
      "tm.s8h": "8. Applicable law and jurisdiction",
      "tm.s8p": "These terms are governed by Portuguese law. For the resolution of any dispute arising from the use of this site, the courts of the district of the company's registered office shall have jurisdiction, without prejudice to the mandatory rules applicable to consumers.",
      "nav.servicos": "Services",
      "nav.sobre": "About",
      "nav.frota": "Fleet",
      "nav.cobertura": "Coverage",
      "nav.contactos": "Contact",
      "cta.quote": "Get a quote",

      "hero.title": "Your <em>trusted</em> partner in freight transport.",
      "hero.lead": "We pick up and deliver your cargo wherever you need it, with the speed your business demands.",
      "hero.ligar": "Call",
      "hero.wa": "or message us on",
      "hero.panel.eyebrow": "Immediate response",
      "phone.note": "(Call to a national mobile network)",
      "hero.img.alt": "White HN Transportes van parked next to a lighthouse at sunset",

      "serv.eyebrow": "What we do",
      "serv.h2": "A service for every type of delivery",
      "serv.sub": "From urgent shipments to dedicated loads, we tailor transport to what each client needs.",
      "serv.c1.t": "Express Transport",
      "serv.c1.d": "Urgent deliveries with top priority and minimal response times for what can't wait.",
      "serv.c2.t": "Dedicated Service",
      "serv.c2.d": "A dedicated van for your cargo, from pickup to destination, with no shared space.",
      "serv.c3.t": "Direct Transport",
      "serv.c3.d": "No transfers: your goods never change vehicle, reducing risks and delivery times.",
      "serv.c4.t": "Loads up to 1,200 kg",
      "serv.c4.d": "Box vans ready for parcels, pallets and varied goods in complete safety.",
      "serv.c5.t": "Available 24/7",
      "serv.c5.d": "Immediate response to emergencies and last-minute needs, 24 hours a day, 7 days a week.",
      "serv.c6.t": "National & Iberian",
      "serv.c6.d": "Door-to-door pickups and deliveries anywhere in Portugal and Spain.",

      "sobre.eyebrow": "About HN Transportes",
      "sobre.h2": "A team committed to delivering with care",
      "sobre.p1": "<strong>Hélder Nunes - Transportes, Unipessoal, Lda</strong> was founded in 2021 by people who know the road well. Since then, we've helped companies and individuals move their goods quickly and with complete peace of mind.",
      "sobre.p2": "When you contact us, you speak directly with the person handling your cargo — no middlemen, no anonymous call centres. That closeness is what lets us respond fast and follow every delivery, from first contact to destination.",
      "sobre.since": "Since",
      "sobre.f1.t": "On time, every time",
      "sobre.f1.d": "We meet the pickup and delivery times we agree on.",
      "sobre.f2.t": "Care for every load",
      "sobre.f2.d": "Direct, secure transport, handled as if it were our own.",
      "about.img.alt": "The HN Transportes team beside their van fleet",

      "frota.eyebrow": "Our fleet",
      "frota.h2": "The fleet you see on the road",
      "frota.sub": "Well-kept, branded vehicles — the image we deliver is the one we drive.",
      "frota.cap1": "Several vehicles, one team",
      "frota.cap2": "HN identity",
      "frota.cap3": "Our logo",
      "frota.cap4": "Across the country",
      "frota.cap5": "Urban deliveries",
      "frota.cap6": "Wherever needed",
      "frota.cap7": "Wide coverage",

      "cob.eyebrow": "Where we reach",
      "cob.h2": "From Cesar across the Iberian Peninsula",
      "cob.body": "Our base in Cesar, Oliveira de Azeméis, has fast access to the country's main routes — a central location that lets us reach the pickup point quickly and head straight to the destination.",
      "cob.chip1": "Mainland Portugal",
      "cob.chip2": "Spain",
      "cob.chip3": "Door to door",
      "cob.map.aria": "HN Transportes route linking Portugal and Spain",
      "cob.map.es": "Spain",

      "con.eyebrow": "Contact",
      "con.h2": "Let's talk right away",
      "con.sub": "Choose your preferred channel. We answer any time, every day.",
      "map.title": "Where we are",
      "map.note": "We use Google Maps to show the map, which sets cookies. Accept to view it here.",
      "map.accept": "Accept and view the map",
      "map.hint": "Alternatively, <a href=\"https://www.google.com/maps/search/?api=1&query=Rua%20da%20Gandara%20158%203700-607%20Cesar%20Oliveira%20de%20Azem%C3%A9is\" target=\"_blank\" rel=\"noopener\">open in Google Maps</a>.",
      "ch.tel": "Phone",
      "ch.email": "Email",
      "ch.morada": "Address",
      "con.dir": "Get directions",

      "footer.blurb": "Freight transport throughout Portugal and Spain, with the trust of those who treat your cargo as their own.",
      "footer.contactos": "Contact",
      "footer.local": "Cesar, Oliveira de Azeméis",
      "footer.lr.sub": "File a complaint online at livroreclamacoes.pt",
      "footer.rights": "All rights reserved.",
      "footer.priv": "Privacy Policy",
      "footer.cookies": "Cookie Policy",
      "footer.termos": "Terms & Legal Notice",
      "footer.cookieset": "Cookie settings",

      "cookie.txt": "We use <strong>Google Maps</strong> cookies only to show the map of our location. You can accept or reject — the site works either way. Learn more in our <a href=\"cookies.html\">Cookie Policy</a>.",
      "cookie.reject": "Reject",
      "cookie.accept": "Accept",

      "a11y.lightbox": "Image viewer",
      "a11y.close": "Close",
      "a11y.prev": "Previous",
      "a11y.next": "Next",
      "a11y.totop": "Back to top",
      "a11y.wa": "Message on WhatsApp",

      "metaTitle.index": "HN Transportes | 24/7 Freight Transport — Portugal & Spain",
      "metaDesc.index": "HN Transportes (Hélder Nunes) — freight transport in box vans with payloads up to 1,200 kg. Express, dedicated and direct services, no transfers, 24 hours a day, across Portugal and Spain. Based in Cesar, Oliveira de Azeméis."
    }
  };

  function getStored() { try { return localStorage.getItem(STORE); } catch (e) { return null; } }
  function setStored(v) { try { localStorage.setItem(STORE, v); } catch (e) {} }

  function detect() {
    var s = getStored();
    if (s && SUPPORTED.indexOf(s) !== -1) return s;
    var n = (navigator.language || navigator.userLanguage || "pt").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(n) !== -1 ? n : "pt";
  }

  function val(lang, key) {
    var d = DICT[lang] || DICT.pt;
    if (d[key] != null) return d[key];
    return DICT.pt[key] != null ? DICT.pt[key] : null;
  }

  function setContent(el, v) {
    // innerHTML só quando há marcação (ex.: <em>, <strong>); caso contrário textContent
    // (necessário para elementos SVG <text>, que não tratam innerHTML de forma fiável).
    if (/<[a-z!/]/i.test(v)) el.innerHTML = v; else el.textContent = v;
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "pt";
    document.documentElement.setAttribute("lang", LOCALE[lang]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = val(lang, el.getAttribute("data-i18n"));
      if (v != null) setContent(el, v);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = val(lang, el.getAttribute("data-i18n-alt"));
      if (v != null) el.setAttribute("alt", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = val(lang, el.getAttribute("data-i18n-aria"));
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var v = val(lang, el.getAttribute("data-i18n-content"));
      if (v != null) el.setAttribute("content", v);
    });

    document.querySelectorAll(".langswitch [data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    setStored(lang);
    document.documentElement.classList.remove("i18n-pending");
  }

  function init() {
    apply(detect());
    document.querySelectorAll(".langswitch [data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
