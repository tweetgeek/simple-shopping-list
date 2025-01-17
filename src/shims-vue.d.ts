// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

// declare module "envConfig";
//
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
