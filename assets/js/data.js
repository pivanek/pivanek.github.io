// Veškerý obsah portfolia. Texty jsou ve tvaru { cs: "...", en: "..." }.
window.PORTFOLIO = {
  name: "Pavel Ivánek",
  email: "p.ivanek@icloud.com",
  github: "https://github.com/pivanek",
  cv: "cv.html",

  // Weby se zobrazí jako živý náhled (iframe). Některé weby vkládání
  // zakazují (X-Frame-Options / CSP frame-ancestors, např. alza.cz) –
  // u nich nastav embed: false a dlaždice ukáže jen odkaz.
  // Ověření: curl -sI https://web.cz | grep -iE 'x-frame|content-security'
  // wip: true – rozpracovaný web, v náhledu dostane štítek „Rozpracováno“.
  websites: [
    // TODO: zástupné weby, nahradit vlastními
    {
      title: { cs: "Wikipedie", en: "Wikipedia" },
      url: "https://cs.wikipedia.org/wiki/Hlavn%C3%AD_strana",
      desc: {
        cs: "Zástupný web – sem přijde popis projektu.",
        en: "Placeholder site – the project description goes here.",
      },
      tags: ["HTML", "CSS"],
    },
    {
      title: { cs: "Bootstrap", en: "Bootstrap" },
      url: "https://getbootstrap.com",
      desc: {
        cs: "Zástupný web – sem přijde popis projektu.",
        en: "Placeholder site – the project description goes here.",
      },
      tags: ["JavaScript", "Sass"],
    },
    {
      title: { cs: "Astro", en: "Astro" },
      url: "https://astro.build",
      wip: true,
      desc: {
        cs: "Zástupný web – sem přijde popis projektu.",
        en: "Placeholder site – the project description goes here.",
      },
      tags: ["TypeScript", "Astro"],
    },
  ],

  // status: "dev" | "done" | "planned"; featured: přes celou šířku
  projects: [
    {
      title: "PivOS",
      featured: true,
      status: "dev",
      kind: { cs: "Linuxová distribuce", en: "Linux distribution" },
      desc: {
        cs: "Minimalistický Linux postavený na Arch Linuxu pro hraní a vývoj, s klasickým desktopem s plovoucími okny na Waylandu. Jde nainstalovat znovu kdykoli a nic se nemusí nastavovat ručně.",
        en: "A minimal Arch-based Linux for gaming and development with a classic floating-window Wayland desktop. Reinstall it anytime and it comes up fully configured.",
      },
      highlights: {
        cs: [
          "Live ISO sestavené přes archiso, vlastní instalátor v shellu",
          "Desktop labwc (Wayland), záložní relace X11",
          "btrfs se subvolumy: reinstalace přepíše systém a /home nechá být",
          "Po přihlášení jen ~408 MB RAM (v0.1)",
        ],
        en: [
          "Live ISO built with archiso, custom shell installer",
          "labwc desktop (Wayland), X11 fallback session",
          "btrfs subvolumes: a reinstall replaces the system and keeps /home",
          "Only ~408 MB RAM used after login (v0.1)",
        ],
      },
      tags: ["Arch Linux", "Bash", "archiso", "Wayland", "btrfs"],
      links: [{ label: { cs: "Kód na GitHubu", en: "Code on GitHub" }, url: "https://github.com/pivanek/PivOS" }],
      terminal: [
        "$ sudo ./build.sh --fast",
        "==> PivOS v0.2-dev live ISO ready in out/",
        "$ sudo pivos-install",
        ":: PivOS found on /dev/vda, reinstall and keep /home? [Y/n]",
        "$ free -m | awk '/Mem/ {print $3 \" MB used\"}'",
        "408 MB used",
      ],
    },
    {
      // TODO: doplnit, až bude aplikace pojmenovaná
      title: { cs: "Nová aplikace", en: "New app" },
      status: "planned",
      kind: { cs: "Aplikace", en: "Application" },
      desc: {
        cs: "Na aplikaci teď začínám pracovat, podrobnosti doplním brzy.",
        en: "I'm just starting work on an app. Details coming soon.",
      },
      tags: [],
      terminal: ["$ git init new-app", "Initialized empty Git repository"],
    },
    {
      title: { cs: "Překladač podmnožiny Wrenu", en: "Wren subset compiler" },
      status: "done",
      kind: { cs: "Školní projekt · IFJ, VUT FIT", en: "Course project · IFJ, BUT FIT" },
      desc: {
        cs: "Plně funkční překladač podmnožiny jazyka Wren do mezikódu, napsaný v C ve čtyřčlenném týmu, který jsem vedl.",
        en: "A fully working compiler from a subset of the Wren language to intermediate code, written in C by a 4-person team I led.",
      },
      highlights: {
        cs: ["Návrh a implementace konečného automatu pro parser a sémantickou analýzu"],
        en: ["Designed and implemented the finite state machine for the parser and semantic analysis"],
      },
      tags: ["C", "Git", "Makefile"],
      terminal: ["$ ./ifjcomp < program.wren > program.code", "$ echo $?", "0"],
    },
    {
      title: { cs: "Game Launcher", en: "Game Launcher" },
      status: "dev",
      kind: { cs: "Školní projekt · ICS, VUT FIT", en: "Course project · ICS, BUT FIT" },
      desc: {
        cs: "Desktopový launcher her v C#. Týmová práce s řízením projektu, verzováním a CI/CD v Azure DevOps.",
        en: "A desktop game launcher in C#. Teamwork with project management, version control and CI/CD in Azure DevOps.",
      },
      tags: ["C#", ".NET", "Azure DevOps"],
      terminal: ["$ dotnet build GameLauncher.sln", "Build succeeded.", "    0 Warning(s)", "    0 Error(s)"],
    },
    {
      title: { cs: "Fitness tracker", en: "Fitness tracker" },
      status: "done",
      kind: { cs: "Maturitní práce", en: "Graduation thesis" },
      desc: {
        cs: "Multiplatformní mobilní aplikace pro záznam tréninků a sledování pokroku, s lokálním ukládáním dat.",
        en: "A cross-platform mobile app for logging workouts and tracking progress, with local data storage.",
      },
      tags: ["React Native", "TypeScript"],
      terminal: ["$ npx react-native run-android", "info Launching app on emulator-5554", "BUILD SUCCESSFUL"],
    },
  ],

  // level: "strong" | "focus" (volitelné)
  skills: [
    {
      group: { cs: "Jazyky", en: "Languages" },
      items: [
        { name: "C", level: "strong" },
        { name: "C++" },
        { name: "C#" },
        { name: "TypeScript", level: "focus" },
        { name: "SQL", level: "focus" },
        { name: "PHP" },
        { name: "Python" },
        { name: "Bash" },
      ],
    },
    {
      group: { cs: "Frameworky", en: "Frameworks" },
      items: [{ name: ".NET" }, { name: "React Native" }, { name: "Symfony" }],
    },
    {
      group: { cs: "Nástroje", en: "Tools" },
      items: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "Azure DevOps" },
        { name: "DataGrip" },
        { name: "Visual Studio" },
      ],
    },
    {
      group: { cs: "Systémy", en: "Systems" },
      items: [
        { name: "Linux" },
        { name: "Arch Linux / archiso" },
        { name: { cs: "Správa sítí", en: "Network administration" } },
      ],
    },
  ],

  ui: {
    cs: {
      navWebsites: "Weby",
      navProjects: "Projekty",
      navSkills: "Dovednosti",
      navContact: "Kontakt",
      langSwitch: "EN",
      langLabel: "Switch to English",
      themeLabel: "Přepnout světlý / tmavý režim",
      wip: "Rozpracováno",
      heroHello: "Ahoj, jsem Pavel.",
      heroLead:
        "Junior software developer z Brna a okolí. Píšu v C a C++, dělám weby a po večerech skládám vlastní linuxovou distribuci.",
      heroNow: "Teď: IT správce na ZUŠ Tišnov · dříve VUT FIT",
      heroProjects: "Projekty",
      heroCv: "Životopis",
      websitesTitle: "Weby",
      websitesSub: "Živé náhledy skutečných webů. Klikni a web se otevře.",
      projectsTitle: "Další projekty",
      projectsSub: "Systémy, aplikace a školní projekty.",
      skillsTitle: "Dovednosti",
      legendStrong: "silná stránka",
      legendFocus: "aktivně rozvíjím",
      contactTitle: "Kontakt",
      contactLead: "Máš nabídku, otázku nebo projekt? Napiš mi.",
      statusDev: "Ve vývoji",
      statusDone: "Hotovo",
      statusPlanned: "Připravuji",
      openSite: "Otevřít web",
      noEmbed: "Tento web nedovoluje živý náhled",
      footer: "Statický web hostovaný na GitHub Pages.",
    },
    en: {
      navWebsites: "Websites",
      navProjects: "Projects",
      navSkills: "Skills",
      navContact: "Contact",
      langSwitch: "CZ",
      langLabel: "Přepnout do češtiny",
      themeLabel: "Toggle light / dark mode",
      wip: "Work in progress",
      heroHello: "Hi, I'm Pavel.",
      heroLead:
        "Junior software developer based near Brno. I write C and C++, build websites and spend my evenings putting together my own Linux distribution.",
      heroNow: "Now: IT administrator at Art School Tišnov · previously BUT FIT",
      heroProjects: "Projects",
      heroCv: "Résumé",
      websitesTitle: "Websites",
      websitesSub: "Live previews of real websites. Click one to open it.",
      projectsTitle: "Other projects",
      projectsSub: "Systems, apps and course projects.",
      skillsTitle: "Skills",
      legendStrong: "strength",
      legendFocus: "active focus",
      contactTitle: "Contact",
      contactLead: "Got an offer, a question or a project? Get in touch.",
      statusDev: "In development",
      statusDone: "Completed",
      statusPlanned: "Coming soon",
      openSite: "Open website",
      noEmbed: "This site doesn't allow a live preview",
      footer: "Static site hosted on GitHub Pages.",
    },
  },
};
