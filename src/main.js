// Import MSW from CDN
const msw = window.MockServiceWorker;

// This configures a Service Worker with the given request handlers.
const worker = msw.setupWorker(
  msw.rest.get(
    "https://authorize-server.mock/authorize",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: "authorizeToken"
        })
      );
    }
  ),
  msw.rest.get("https://authorize-server.mock/token", (req, res, ctx) => {})
);

worker.start({
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
});

function auth(){
  fetch(
    "https://authorize-server.mock/authorize"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert(data.token);
    });
}