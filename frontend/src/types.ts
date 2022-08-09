import { HeadClient } from '@vueuse/head';
import type { App } from 'vue'
import { Router, RouteRecordRaw } from 'vue-router';

type ViteVueContext = {
  app: App<Element>;
  router: Router;
  routes: Readonly<RouteRecordRaw[]>;
  initialState: Record<string, any>;
  head: HeadClient | undefined;
};

export type UserModule = (ctx: ViteVueContext) => void
