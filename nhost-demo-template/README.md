<p align='center'>Vitesse - Opinionated Vite Starter Template with NHost and Quasar support</p>

<p  align='center'>
<a  href="https://nhost-quasar-vite.netlify.app/">Live Demo</a>
</p>
<br>

## Frontend Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness
- 🗂 [File based routing](./frontend/src/pages)
- 📦 [Components auto importing](./frontend/src/components)
- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)
- 📑 [Layout system](./frontend/src/layouts)
- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine
- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- 🌍 [I18n ready](./frontend/locales), in this template only cs and en language
- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-vue-markdown)
- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)
- 🤙🏻 [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) enabled
- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly
- 🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)
- 🦾 TypeScript, of course
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)
- ☁️ Deploy on Netlify, zero-config
- 📑[Quasar](https://github.com/quasarframework/quasar) Framework integration
  <br>

## Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.
- [Quasar](https://github.com/quasarframework/quasar) - Quasar framework.

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- [Iconset](https://quasar.dev/vue-components/icon) from quasar framework

### Plugins

- [Vue Router](https://github.com/vuejs/router)
- [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
- [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api
- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
- [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
- [`vite-plugin-vue-markdown`](https://github.com/antfu/vite-plugin-vue-markdown) - Markdown as components / components in Markdown
- [`markdown-it-shiki`](https://github.com/antfu/markdown-it-shiki) - [Shiki](https://github.com/shikijs/shiki) for syntax highlighting
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
- [`vite-plugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n) - Vite plugin for Vue I18n
- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - Sitemap generator
- [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively
- [NHost.io](https://nhost.io/) integration - the best backend service for me. I this repo I show login, register, lost password and logout. In the Profile page I use storage (for Avatar) and GraphQL for update user data.

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
- [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Backend Features

For backend I will use NHOST.io features :

- auth
- storage
- graphql
- function

## Usage

### Development

Prepare local backend with [nhost-cli](https://github.com/nhost/cli). Please instal cli as described [here](https://github.com/nhost/cli#installation). Then move to the nhost-demo-template folder

```bash
cd nhost-demo-template
nhost up
```

You may see hasura console here : http://localhost:1337

Then you may run

```bash
cd frontend
npx vite --port=4010
```

Just run and visit http://localhost:4010

### Build

To build the App, run

```bash
cd frontend
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute. Don't forget use frontend folder as root folder.
Please do not forget set this ENV variables on the Netlify site:

```
VITE_FRONTEND_URL - front end URL address ( without / at the end)
VITE_NHOST_REGION - region from your NHost.io app
VITE_NHOST_SUBDOMAIN - subdomain from your NHost.io app
```

## Why

I have been using Hasura GraphQL Engine as a backend for my projects for a long time. Now, after a long time, I found the NHost.io cloud solution and I have to say that, except for a few minor things (e.g. email templates only in the paid version), this product suits me.

In the same way, I used the Vitesse template for my projects, so I decided to extend it with NHost.io functions. In my opinion, it is a combination of some of the best things available now.

It is a complex solution and I will be happy if this template contributes to the expansion of already published examples and templates.
