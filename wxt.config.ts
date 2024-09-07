import path from 'node:path'
import { defineConfig } from 'wxt'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'shy-nav',
    description: 'A simple navigation extension',
    icons: {
      512: '/icon.png',
      20: '/icon/20.png',
      96: '/icon/96.png',
      120: '/icon/120.png',
    },
    permissions: ['topSites', 'storage', 'favicon', 'bookmarks'],
    host_permissions: [
      'https://cn.bing.com/',
      'https://api.bing.com/',
      'https://suggestion.baidu.com/',
      'https://suggestqueries.google.com/',
      'https://v2.jinrishici.com/',
    ],
  },
  vite: () => ({
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'entrypoints/newtab')}/`,
      },
    },
    plugins: [
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        dirs: ['entrypoints/newtab/pages'],
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dirs: ['entrypoints/newtab/composables'],
        dts: true,
        vueTemplate: true,
      }),
      // https://github.com/antfu/vite-plugin-components
      Components({
        dirs: ['entrypoints/newtab/components'],
        dts: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],
  }),
})
