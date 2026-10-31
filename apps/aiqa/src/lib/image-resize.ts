/**
 * Downscale a picked/pasted image to a JPEG data URL so a few screenshots
 * don't eat the browser's storage. 1800px on the long side stays readable for text.
 */
export async function imageFileToDataUrl(
  file: File,
  maxSide = 1800,
  quality = 0.88,
): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("That file isn't an image.");

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Couldn't process the image.");

  // JPEG has no transparency — paint white first so transparent PNGs don't turn black.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  return canvas.toDataURL("image/jpeg", quality);
}
