export const defaultFetch = function (req) {
  return fetch(req).then((res) => {
    if (!res.ok) {
      throw new FetchError(res.status + ": " + res.statusText, { cause: res });
    }
  });
};

export const FetchError = class FetchError extends Error {};