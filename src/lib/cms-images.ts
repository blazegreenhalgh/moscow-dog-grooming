import type { ImageMetadata } from "astro";

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{avif,gif,jpeg,jpg,png,tif,tiff,webp}",
  { eager: true },
);

export const resolveCmsImage = (path: string) => imageModules[path]?.default;
