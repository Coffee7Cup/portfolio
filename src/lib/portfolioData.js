
export const portfolioData = {
  personal: {
    name: 'Yashwanth',
    title: 'Hey, I\'m Yashwanth',
    bio: 'I am a developer focused on building clean, efficient, and user-centric digital experiences. I specialize in systems programming, custom networking architectures, and crafting responsive frontend interfaces.',
    email: 'maddysai9848@gmail.com',
    github: 'https://github.com/coffee7cup',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
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
      desc: 'A real-time stock market simulation engine built to handle high-concurrency event hosting. Leverages WebSockets for instant state updates.',
      tags: ['Svelte', 'Go', 'Fiber', 'PostgreSQL', 'WebSockets']
    },
    {
      img: '/images/demo-window-switcher.png',
      title: 'App Drawer',
      desc: 'A minimalist, keyboard-driven application launcher leveraging the layer-shell protocol, custom-tailored for the Niri Wayland window manager.',
      tags: ['Rust', 'Wayland', 'LayerShell', 'Linux']
    },
    {
      img: '/images/cie.png',
      title: 'CIE Platform',
      desc: 'The official web portal for the Center for Innovation and Entrepreneurship, focused on clean layout mechanics and fast load times.',
      tags: ['SvelteKit', 'JavaScript', 'TailwindCSS']
    },
    {
      img: '/images/apav.png',
      title: 'Annapurnamma Avasam',
      desc: 'A dedicated web application built to streamline operations and provide a clean digital interface for the community.',
      tags: ['SvelteKit', 'JavaScript', 'Frontend']
    },
    //{
    //img: '/images/devkagitam.png',
    //title: 'Kagitham',
    //desc: 'A native, modular Android utility application built using a dynamic host-plugin architecture.',
    //tags: ['Kotlin', 'Jetpack Compose', 'Android SDK Component']
    //}
  ],
  certificates: ['/certificates/mittal-1.png', "certificates/devit.png"]
};
