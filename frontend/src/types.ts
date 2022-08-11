import { HeadClient } from "@vueuse/head";
import type { App } from "vue";
import {
  Router,
  RouteRecordRaw,
  RouterOptions as VueRouterOptions,
} from "vue-router";

type PartialKeys<T, Keys extends keyof T> = Omit<T, Keys> &
  Partial<Pick<T, Keys>>;

export type ViteVueContext = {
  app: App<Element>;
  router: Router;
  routes: Readonly<RouteRecordRaw[]>;
  initialState: Record<string, any>;
  head: HeadClient | undefined;
  isClient: boolean;
  onSSRAppRendered(cb: Function): void;
  triggerOnSSRAppRendered(
    route: string,
    appHTML: string,
    appCtx: ViteVueContext
  ): Promise<unknown[]>;
  routePath?: string;
};

export type UserModule = (ctx: ViteVueContext) => void;

export type RouterOptions = PartialKeys<VueRouterOptions, "history"> & {
  base?: string;
};

export interface ViteVuaAppClientOptions {
  useHead?: boolean;
  /**
   * The app root container query selector.
   *
   * @default `#app`
   */
  rootContainer?: string | Element;
}
