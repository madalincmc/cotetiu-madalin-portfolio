import { readFileSync } from "node:fs";
import path from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

const cache = new Map<string, ImageSize | null>();

function readPngSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpegSize(buffer: Buffer): ImageSize | null {
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    // SOF0-SOF15 carry the frame dimensions; DHT/JPG/DAC share the range but not the layout.
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

/**
 * Intrinsic size of an image under `public/`, read at build time so next/image can
 * reserve the right box instead of falling back to a fixed placeholder ratio.
 * Returns null for remote URLs, missing files, and formats we don't parse.
 */
export function getPublicImageSize(publicPath: string): ImageSize | null {
  if (!publicPath.startsWith("/")) return null;

  const cached = cache.get(publicPath);
  if (cached !== undefined) return cached;

  let size: ImageSize | null = null;
  try {
    const buffer = readFileSync(path.join(process.cwd(), "public", publicPath));
    size = readPngSize(buffer) ?? readJpegSize(buffer);
  } catch {
    size = null;
  }

  cache.set(publicPath, size);
  return size;
}
