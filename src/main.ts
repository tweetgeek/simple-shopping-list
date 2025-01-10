import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import { SafeArea } from '@capacitor-community/safe-area';
import ToastService from 'primevue/toastservice';
import * as Sentry from "@sentry/vue";

SafeArea.enable({
  config: {
    customColorsForSystemBars: true,
    statusBarColor: '#00000000', // transparent
    statusBarContent: 'light',
    navigationBarColor: '#00000000', // transparent
    navigationBarContent: 'light',
  },
});

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://931e081d95c9de3182d3c541bc6b7a54@o415685.ingest.us.sentry.io/4508659509886976",
  environment: "development",
  integrations: [
    // Sentry.browserTracingIntegration({ router }),
    // Sentry.replayIntegration(),
  ],
  // Tracing
  // tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // // Session Replay
  // replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  // replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: 'none',
  ripple: true,
});
app.use(ToastService);
app.directive('ripple', Ripple);

app.directive('styleclass', StyleClass);
app.mount('#app');
