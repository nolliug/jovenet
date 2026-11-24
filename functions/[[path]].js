const PAGES = {
  "jovenet.consulting": {
    lang: "en",
    title: "Jovenet Consulting | ICANN New gTLD Consulting",
    description: "Jovenet Consulting brings 14 years of experience in ICANN new generic top-level domains, from the first new gTLD application round onward.",
    canonical: "https://jovenet.consulting/",
    eyebrow: "ICANN New gTLDs · Independent consulting",
    headline: "Experience in the evolution of the Internet namespace.",
    intro: "Jovenet Consulting has worked in the field of ICANN new generic top-level domains for 14 years, across the first round of the programme and the developments that followed.",
    aboutTitle: "A focused practice",
    aboutCopy: "Our work has centred on the new gTLD ecosystem: ICANN policies, application processes and the operational considerations involved in introducing new generic top-level domains.",
    storyTitle: "A continuing perspective",
    storyCopy: "From the first ICANN new gTLD round onward, Jovenet has followed the development of the programme and the changing landscape for applicants, brands and the domain name industry.",
    contactTitle: "Continue the conversation",
    contactCopy: "For enquiries, connect directly with Jean Guillon on LinkedIn.",
    partnerLead: "Also:"
  },
  "jovenet.com": {
    lang: "en",
    title: "Jovenet | Introduction to Jovenet Consulting",
    description: "Discover Jovenet Consulting, its background in ICANN new generic top-level domains, and the purpose of the jovenet.com domain.",
    canonical: "https://jovenet.com/",
    eyebrow: "Jovenet · A brief introduction",
    headline: "A name connected to the next generation of domain names.",
    intro: "Jovenet Consulting was established around the emergence of ICANN's new generic top-level domains. Its work focused on the new namespace rather than legacy domain extensions. The jovenet.com domain was retained for brand identity and defensive cybersecurity purposes.",
    aboutTitle: "Why jovenet.com?",
    aboutCopy: "Although the consultancy focused on new generic top-level domains, jovenet.com was retained as a familiar point of reference and as part of the brand's defensive domain-name and cybersecurity posture.",
    storyTitle: "The consulting background",
    storyCopy: "For 14 years, Jovenet Consulting followed the first ICANN new gTLD round and the continuing evolution of the programme, building a perspective on this changing domain name landscape.",
    contactTitle: "Learn more",
    contactCopy: "For further information, connect with Jean Guillon on LinkedIn.",
    partnerLead: "Explore:"
  },
  "jovenet.email": {
    lang: "en",
    title: "Jovenet.email | Jovenet Consulting Communications",
    description: "The jovenet.email domain was used exclusively for Jovenet Consulting email communications.",
    canonical: "https://jovenet.email/",
    eyebrow: "Jovenet.email · Communications",
    headline: "A dedicated domain for email communication.",
    intro: "The jovenet.email domain was used exclusively for email communications associated with Jovenet Consulting and its work in ICANN new generic top-level domains.",
    aboutTitle: "A dedicated purpose",
    aboutCopy: "Rather than serving as a separate corporate website, jovenet.email provided a distinct domain identity for professional email correspondence.",
    storyTitle: "Connected to Jovenet Consulting",
    storyCopy: "Jovenet Consulting worked in the new gTLD field for 14 years, spanning the first ICANN application round and the subsequent development of the programme.",
    contactTitle: "Get in touch",
    contactCopy: "To contact Jean Guillon, use his LinkedIn profile.",
    partnerLead: "Related:"
  },
  "jovenet.fr": {
    lang: "fr",
    title: "Jovenet Consulting | Conseil en nouveaux gTLD de l’ICANN",
    description: "Jovenet Consulting : 14 ans d’expérience dans les nouveaux domaines génériques de premier niveau (gTLD) de l’ICANN.",
    canonical: "https://jovenet.fr/",
    eyebrow: "Nouveaux gTLD de l’ICANN · Conseil indépendant",
    headline: "Une expertise dans l’évolution de l’espace des noms de domaine.",
    intro: "Jovenet Consulting a exercé pendant 14 ans dans le domaine des nouveaux domaines génériques de premier niveau (new gTLD) de l’ICANN, depuis le premier cycle de candidatures et au fil des évolutions du programme.",
    aboutTitle: "Une expertise spécialisée",
    aboutCopy: "L’activité de Jovenet Consulting portait sur l’écosystème des nouveaux gTLD : politiques de l’ICANN, procédures de candidature et enjeux opérationnels liés à l’introduction de nouvelles extensions génériques.",
    storyTitle: "Une expérience dans la durée",
    storyCopy: "Depuis le premier cycle de nouveaux gTLD de l’ICANN, Jovenet a suivi l’évolution du programme et les transformations de cet environnement pour les candidats, les titulaires de marques et les acteurs du secteur des noms de domaine.",
    contactTitle: "Poursuivre l’échange",
    contactCopy: "Pour toute demande, vous pouvez contacter Jean Guillon directement sur LinkedIn.",
    partnerLead: "À découvrir :"
  }
};

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

function setElement(html, id, value, tag) {
  const re = new RegExp("<" + tag + "(\\s+[^>]*?\\sid=[\\\"']" + id + "[\\\"'][^>]*)>[\\s\\S]*?<\\/" + tag + ">", "i");
  return html.replace(re, (match, attrs) => "<" + tag + attrs + ">" + esc(value) + "</" + tag + ">");
}

function setMeta(html, selector, value) {
  const re = new RegExp("<meta(?=[^>]*" + selector + ")[^>]*>", "i");
  if (re.test(html)) return html.replace(re, (tag) => {
    if (/\\scontent=/i.test(tag)) return tag.replace(/content=(["']).*?\\1/i, 'content="' + esc(value) + '"');
    return tag.replace(/\\s*\\/?>(?=$)/, ' content="' + esc(value) + '">');
  });
  return html.replace("</head>", '<meta ' + selector + ' content="' + esc(value) + '">\\n</head>');
}

function render(html, host, page) {
  html = html.replace(/<html([^>]*)lang=(["']).*?\\2/i, '<html$1lang="' + page.lang + '"');
  html = html.replace(/<title>[\\s\\S]*?<\\/title>/i, "<title>" + esc(page.title) + "</title>");
  html = setMeta(html, 'name="description"', page.description);
  html = setMeta(html, 'property="og:title"', page.title);
  html = setMeta(html, 'property="og:description"', page.description);
  html = setMeta(html, 'property="og:url"', page.canonical);
  html = setMeta(html, 'name="twitter:card"', "summary");
  html = setMeta(html, 'name="twitter:title"', page.title);
  html = setMeta(html, 'name="twitter:description"', page.description);
  html = html.replace(/<link([^>]*rel=["']canonical["'][^>]*)>/i, '<link rel="canonical" href="' + esc(page.canonical) + '">');
  html = setElement(html, "eyebrow", page.eyebrow, "p");
  html = setElement(html, "headline", page.headline, "h1");
  html = setElement(html, "intro", page.intro, "p");
  html = setElement(html, "about-title", page.aboutTitle, "h2");
  html = setElement(html, "about-copy", page.aboutCopy, "p");
  html = setElement(html, "story-title", page.storyTitle, "h2");
  html = setElement(html, "story-copy", page.storyCopy, "p");
  html = setElement(html, "contact-title", page.contactTitle, "h2");
  html = setElement(html, "contact-copy", page.contactCopy, "p");
  if (page.lang === "fr") {
    html = html.replace('id="header-link" href="https://www.linkedin.com/in/guillon/">Connect with Jean Guillon ↗', 'id="header-link" href="https://www.linkedin.com/in/guillon/">Contacter Jean Guillon ↗');
    html = html.replace('id="contact-button">Contact Jean Guillon ↗', 'id="contact-button">Contacter Jean Guillon ↗');
    html = html.replace('aria-label="Jean Guillon on X"', 'aria-label="Jean Guillon sur X"');
    html = html.replace('aria-label="gTLD Club on Bluesky"', 'aria-label="gTLD Club sur Bluesky"');
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Jovenet Consulting",
    "url": page.canonical,
    "description": page.description,
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.linkedin.com/in/guillon/",
      "https://x.com/jeanguillon",
      "https://bsky.app/profile/gtld.club"
    ]
  };
  html = html.replace("</head>", '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, "\\u003c") + '</script>\\n</head>');
  return html;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase().replace(/^www\\./, "");
  const page = PAGES[host];
  if (!page) return context.env.ASSETS.fetch(context.request);

  if (url.pathname === "/robots.txt") {
    const body = "User-agent: *\\nAllow: /\\nSitemap: " + page.canonical + "sitemap.xml\\n";
    return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
  }
  if (url.pathname === "/sitemap.xml") {
    const body = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + esc(page.canonical) + '</loc></url></urlset>';
    return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
  }

  const response = await context.env.ASSETS.fetch(context.request);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html") || url.pathname !== "/") return response;

  const html = render(await response.text(), host, page);
  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
}
