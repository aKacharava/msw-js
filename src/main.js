// Import MSW from CDN
const msw = window.MockServiceWorker;

import { oauth2Fetch } from "./OAuth2Fetch";

// This configures a Service Worker with the given request handlers.
const worker = msw.setupWorker(
  msw.rest.get( "https://authorize-server.mock/authorize", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: "authorizeToken"
      })
    );
  }),
  msw.rest.get("https://authorize-server.mock/token", (req, res, ctx) => {

  })
);

worker.start({
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
});

async function auth(){
  oauth2Fetch("https://authorize-server.mock/authorize");
}

document.querySelector("button").onclick = auth();