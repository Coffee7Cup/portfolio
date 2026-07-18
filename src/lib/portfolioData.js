
export const portfolioData = {
  personal: {
    name: 'Yashwanth',
    title: 'Hey, I\'m Yashwanth',
    bio: 'I\'m a developer focused on building clean, efficient, and user-centric digital experiences. I specialize in systems programming, custom networking architectures, and crafting responsive frontend interfaces.',
    email: 'maddysai9848@gmail.com',
    github: 'https://github.com/coffee7cup',
    linkedin: 'https://www.linkedin.com/in/kategaru-yashwanth-sai-252486334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  about: {
    bio: 'I\'m a systems and fullstack engineer focused on building high-performance, minimalist digital infrastructure. From writing low-level Wayland tools in Rust and concurrent backends in Go, to crafting granular, VDOM-free frontends in Svelte and native Android apps in Compose, I build for speed, efficiency, and deep OS integration.',
    highlights: [
      'Rust dev',
      'Backend systems',
      'Linux native (layershell applications)',
      'Android dev',
      'Web dev'
    ]
  },
  projects: [
    {
      img: '/images/w-0.png',
      title: 'WallStreet',
      desc: 'A high-frequency trading simulation engine that compresses 3 years of market data into an intense 3-hour live event. Built with Go for concurrency, and Svelte instead of heavy VDOM frameworks "uhm uhmm react" for a lighter, signal-based frontend. WebSocket state updates backed by PostgreSQL (JSONB) keep things fast and consistent.',
      tags: ['Svelte', 'Go', 'Fiber', 'PostgreSQL', 'WebSockets'],
      link: "",
      github: 'https://github.com/coffee7cup/wallstreet'
    },
    {
      img: '/images/demo-window-switcher.png',
      title: 'App Drawer',
      desc: 'A mouse-driven app launcher and window switcher built in Rust with guido.rs, made for the Niri Wayland compositor "basically so my family and friends can actually open and switch apps on my keyboard-only linux desktop". Uses the Wayland layer-shell protocol for an instant, native-feeling GUI.',
      tags: ['Rust', 'Wayland', 'LayerShell', 'Linux'],
      link: "",
      github: 'https://github.com/coffee7cup/app-drawer-rs'
    },
    {
      img: '/images/cie.png',
      title: 'CIE Platform',
      desc: 'The web portal for my college\'s Center for Innovation and Entrepreneurship club, with Three.js animations to show off a bit and make the club look cool. Runs serverless, using GitHub itself as a CMS, so content updates live without any CI/CD redeploys or backend budget.',
      tags: ['SvelteKit', 'Three.js', 'TailwindCSS', 'Serverless'],
      link: "https://coffee7cup.github.io/cie-1",
      github: 'https://github.com/coffee7cup/cie-1'
    },
    {
      img: '/images/apav.png',
      title: 'Annapurnamma Avasam',
      desc: 'A Community Service Project built to give a local community a clean digital presence. Won "Best CSP of the Year" at college.',
      tags: ['React', 'JavaScript', 'TailwindCSS', 'Frontend'],
      link: "https://annapurnammaavasam.in",
      github: 'https://github.com/Coffee7Cup/frontend-donation'
    }
  ],
  certificates: ['/certificates/mittal.png', "certificates/devit.png", "certificates/internpe.jpeg"]
};
