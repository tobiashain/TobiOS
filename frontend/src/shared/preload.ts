import { DesktopIcons } from "../desktop/desktopIcons";

export function preloadVideo(src: string) {
  const video = document.createElement("video");
  video.src = src;
  video.preload = "auto";
  video.muted = true;
  video.load();
}

export function getAllIconUrls(icons: DesktopIcons[]): string[] {
  const urls: string[] = [];
  for (const icon of icons) {
    if (icon.icon) urls.push(icon.icon);
    if (icon.children) urls.push(...getAllIconUrls(icon.children));
  }
  return urls;
}

export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
