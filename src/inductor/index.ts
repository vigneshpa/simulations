import App from './index.svelte';

const app = new App({ target: window.document.body }); // mounting app in the body
(<any>window).app = app;
