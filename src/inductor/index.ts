import App from './index.svelte';

const app = new App({ target: window.document.body });
(<any>window).app = app;
