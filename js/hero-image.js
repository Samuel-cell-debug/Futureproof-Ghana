// hero-image.js
// Ensure the hero uses a PNG: try to load assets/images/hero.png; if missing,
// fetch the SVG and rasterize it to a PNG data URL and set that as the image src.
(function () {
  async function urlExists(url) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  function svgToPngDataUrl(svgText, width = 1600, height = 500) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const svg = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svg);
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          // Fill transparent background with gradient similar to SVG for consistent appearance
          ctx.fillStyle = "#0A5C36";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          URL.revokeObjectURL(url);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });
  }

  async function ensureHeroPng() {
    const imgEl = document.getElementById("hero-img");
    if (!imgEl) return;

    const pngPath = "assets/images/hero.png";
    const svgPath = "assets/images/hero.svg";

    if (await urlExists(pngPath)) {
      imgEl.src = pngPath;
      return;
    }

    // Try to fetch the SVG and rasterize to PNG at runtime
    try {
      const res = await fetch(svgPath);
      if (!res.ok) throw new Error("SVG not found");
      const svgText = await res.text();
      const dataUrl = await svgToPngDataUrl(svgText, 1600, 500);
      imgEl.src = dataUrl;
    } catch (err) {
      // last resort, keep original svg as src
      imgEl.src = svgPath;
      console.warn(
        "hero-image: failed to create PNG from SVG, using SVG directly",
        err
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureHeroPng);
  } else {
    ensureHeroPng();
  }
})();
