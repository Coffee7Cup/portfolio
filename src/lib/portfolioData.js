
export const portfolioData = {
  personal: {
    name: 'Yashwanth',
    title: 'Hey, I\'m Yashwanth',
    bio: 'I am a developer focused on building clean, efficient, and user-centric digital experiences. I specialize in systems programming, custom networking architectures, and crafting responsive frontend interfaces.',
    email: 'maddysai9848@gmail.com',
    github: 'https://github.com/coffee7cup',
    linkedin: 'https://www.linkedin.com/in/kategaru-yashwanth-sai-252486334?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  },
  about: {
    bio: 'I am a systems and frontend engineer focused on building high-performance, minimalist digital infrastructure. From writing low-level Wayland tools in Rust and concurrent backends in Go, to crafting granular, VDOM-free frontends in Svelte and native Android apps in Compose, I build for speed, efficiency, and deep OS integration.',
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
      desc: 'Flagship high-frequency trading simulation engine that compressed 3 years of market data into an intense 3-hour live event. Built with Go for high concurrency performance and lightweight compilation ergonomics. Replaced heavy VDOM diffing frameworks "uhm uhmm react" with Svelte’s fine-grained compiler, with signal based reactivity, that hammers the cpu less. To maintain high-throughput & consistancy, I used WebSocket state updates, backed by a robust PostgreSQL layer utilizing JSONB for flexible transaction schemas.',
      tags: ['Svelte', 'Go', 'Fiber', 'PostgreSQL', 'WebSockets'],
      github: 'https://github.com/coffee7cup/wallstreet'
    },
    {
      img: '/images/demo-window-switcher.png',
      title: 'App Drawer',
      desc: 'A Mouse(GUI) application launcher and window switcher built in Rust (using guido.rs) to bridge the gap between advanced keyboard workflows and casual user access "basically I made it so that, my family or friends can atleat open and switch between apps on my heavily keyboard driven linux-(niri-wm) desktop". Made exclusively for the Niri Wayland window manager, it leverages the Wayland layer-shell protocol to provide an instantaneous, smooth graphical interface that feels native to the environment.',
      tags: ['Rust', 'Wayland', 'LayerShell', 'Linux'],
      github: 'https://github.com/your-username/app-drawer'
    },
    {
      img: '/images/cie.png',
      title: 'CIE Platform',
      desc: 'The web portal for the Center for Innovation and Entrepreneurship club (I\'m a member of CIE club <GPREC>), utilizing Three.js for interactive 3D web animations (just to show of my skill and make our club look cool). Engineered with a serverless architecture that repurposes GitHub as a dynamic Content Management System (CMS), allowing real-time content updates directly via repository data files without requiring continuous frontend CI/CD redeployments. (for the requirments of my club, I figured out I dont need any backend, and being causious about the budget constaints i felt using GitHub as a CMS will be a good choise)',
      tags: ['SvelteKit', 'Three.js', 'TailwindCSS', 'Serverless'],
      github: 'https://github.com/your-username/cie-platform'
    },
    {
      img: '/images/apav.png',
      title: 'Annapurnamma Avasam',
      desc: 'A web application developed as a Community Service Project (CSP) to establish a clean digital presence for a local community. I was awarded the "Best CSP of the Year" at college.',
      tags: ['React', 'JavaScript', 'TailwindCSS', 'Frontend'],
      github: 'https://github.com/your-username/annapurnamma-avasam'
    }
  ],

  certificates: ['/certificates/mittal.png', "certificates/devit.png", "certificates/internpe.jpeg"]
};
