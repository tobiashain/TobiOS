export default function preloadVideo({ src }) {
  const video = document.createElement("video");
  video.src = src;
  video.preload = "auto";
  video.muted = true;
  video.load();
}
