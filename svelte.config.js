import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
  },
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Required for client-side single page app routing on GH Pages
      precompress: false,
      strict: true
    }),
    paths: {
      // Uses the repo subfolder in production, but keeps it empty for local npm run dev
      base: process.argv.includes('dev') ? '' : '/portfolio'
    }
  }
};

export default config;
