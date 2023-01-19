import path from "path";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
// import generateSitemap from 'vite-ssg-sitemap'
import Layouts from "vite-plugin-vue-layouts";
import Components from "unplugin-vue-components/vite";
import { QuasarResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import Markdown from "vite-plugin-vue-markdown";
import { VitePWA } from "vite-plugin-pwa";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Inspect from "vite-plugin-inspect";
import LinkAttributes from "markdown-it-link-attributes";
import Unocss from "unocss/vite";
import Shiki from "markdown-it-shiki";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
// import generate from "vite-plugin-pages-sitemap";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    resolve: {
      alias: {
        "~/": `${path.resolve(__dirname, "src")}/`,
      },
    },

    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
        reactivityTransform: true,
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: "src/styles/quasar-variables.sass",
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        // onRoutesGenerated: (routes) => console.log(routes),
        extensions: ["vue", "md"],
        // onRoutesGenerated: (routes) => generate({ routes }),
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          "vue",
          "vue-router",
          "vue-i18n",
          "vue/macros",
          "@vueuse/head",
          "@vueuse/core",
        ],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/composables", "src/store"],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        resolvers: [QuasarResolver()],
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/components.d.ts",
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),

      // https://github.com/antfu/vite-plugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: "prose prose-sm m-auto text-left",
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: "vitesse-light",
              dark: "vitesse-dark",
            },
          });
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: "_blank",
              rel: "noopener",
            },
          });
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
        manifest: {
          name: "NhostQuasarVitesse",
          short_name: "NQV",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/icons/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, "locales/**")],
      }),

      // https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ["test/**/*.test.ts"],
      environment: "jsdom",
      deps: {
        inline: ["@vue", "@vueuse", "vue-demi"],
      },
    },

    // https://github.com/antfu/vite-ssg
    // ssgOptions: {
    //   script: 'async',
    //   formatting: 'minify',
    //   onFinished() { generateSitemap() },
    // },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ["workbox-window", /vue-i18n/],
    },
    optimizeDeps: {
      exclude: ["./nhost-demo-template/*"],
    },
    build: {
      // reportCompressedSize: true,
      //   chunkSizeWarningLimit: 1024,
      //   rollupOptions: {
      //     output: {
      //       manualChunks(id) {
      //         if (id.includes("/node_modules/")) {
      //           const modules = ["quasar", "@quasar", "vue", "@vue"];
      //           const chunk = modules.find((module) =>
      //             id.includes(`/node_modules/${module}`)
      //           );
      //           return chunk ? `vendor-${chunk}` : "vendor";
      //         }
      //       },
      //     },
      //   },
    },
  };
});
