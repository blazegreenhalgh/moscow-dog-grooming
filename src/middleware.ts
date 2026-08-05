import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.pathname.startsWith("/api/keystatic/")) {
    return next();
  }

  const requestUrl = new URL(context.request.url);

  if (context.url.protocol === "https:" && requestUrl.protocol !== "https:") {
    return context.rewrite(new Request(context.url, context.request));
  }

  return next();
});
