// performative-ui (https://github.com/vorpus/performativeUI, MIT) islands on the static page.
// React and the library load from esm.sh (see the import map in index.html); the page works without them.
import { createElement as h, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Aurora, FloatingSparkles, TokenStream } from "performative-ui";

const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

const island = (host, element) => createRoot(host).render(element);
const layer = (parent, className) => parent.appendChild(Object.assign(document.createElement("div"), { className }));

// Aurora behind the main column, in the theworks blues
const blobs = [
    { color: "rgba(16, 52, 166, 0.35)", x: 15, y: 20, size: 55 },
    { color: "rgba(157, 180, 255, 0.35)", x: 85, y: 35, size: 50 },
    { color: "rgba(16, 52, 166, 0.2)", x: 50, y: 90, size: 60 },
];
island(layer(document.querySelector("main"), "ui-aurora"), h(Aurora, { blobs, static: still }));

// A few faint sparkles drifting up the side panel
if (!still) {
    island(layer(document.querySelector(".panel"), "ui-sparkles"),
        h(FloatingSparkles, { count: 10, glyphs: ["✦", "·"], sizeRange: [6, 12] }));
}

// ASCII rendition of the photo; hovering or focusing the link shows the photo again
const RAMP = " .:-=+*#%@"; // sparsest to densest, light ink on the blue panel

function AsciiPortrait({ src, cols }) {
    const [lines, setLines] = useState(null);
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            // Monospace cells are about twice as tall as wide, so sample half as many rows
            const rows = Math.round(cols * (img.height / img.width) * 0.5);
            const canvas = Object.assign(document.createElement("canvas"), { width: cols, height: rows });
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, cols, rows);
            const { data } = ctx.getImageData(0, 0, cols, rows);
            const luma = [];
            for (let i = 0; i < data.length; i += 4) luma.push(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
            // Stretch the contrast: the photo is a mid-grey face on a dark background
            const lo = Math.min(...luma), hi = Math.max(...luma);
            const out = [];
            for (let y = 0; y < rows; y++) {
                let line = "";
                for (let x = 0; x < cols; x++) {
                    const v = ((luma[y * cols + x] - lo) / (hi - lo)) ** 1.4;
                    line += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
                }
                out.push(line);
            }
            setLines(out);
        };
        img.src = src;
    }, [src, cols]);
    if (!lines) return null;
    return h("pre", { className: "ui-ascii", "aria-hidden": "true", style: { "--cols": cols } }, lines.join("\n"));
}

const photo = document.querySelector(".photo");
const portrait = Object.assign(document.createElement("span"), { className: "ui-portrait" });
photo.after(portrait);
photo.parentElement.classList.add("ui-photo-link");
island(portrait, h(AsciiPortrait, { src: photo.src, cols: 56 }));

// The bio streams in token by token. Screen readers get the real paragraph throughout,
// and once the stream completes the real paragraph, with its links, takes its place.
const bio = document.querySelector(".about p");
if (!still) {
    const stream = Object.assign(document.createElement("div"), { className: "ui-stream" });
    stream.setAttribute("aria-hidden", "true");
    bio.before(stream);
    bio.classList.add("ui-sr-only");
    const done = () => { stream.remove(); bio.classList.remove("ui-sr-only"); };
    const text = bio.textContent.replace(/\s+/g, " ").trim();
    island(stream, h("p", null, h(TokenStream, { text, speedMs: [8, 25], hideCaret: true, onComplete: done })));
}
