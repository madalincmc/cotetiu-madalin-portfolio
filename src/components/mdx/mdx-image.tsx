import Image from "next/image";
import type { ComponentProps } from "react";
import { getPublicImageSize } from "@/lib/images";

/**
 * `img` replacement for MDX bodies. PNG/JPEG files under `public/` go through next/image with
 * their real dimensions; everything else (SVG diagrams, remote URLs) renders as a plain <img>,
 * since there is nothing for the optimizer to do with a vector file.
 */
export function MdxImage({ src, alt = "", title }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;

  const size = getPublicImageSize(src);
  const image = size ? (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      sizes="(min-width: 768px) 768px, 100vw"
      className="border-border rounded-xl border"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" className="border-border w-full rounded-xl border" />
  );

  if (!title) return image;

  // Markdown wraps a standalone image in <p>, where <figure> isn't allowed — spans keep the
  // markup valid while still rendering as a captioned block.
  return (
    <span className="block">
      {image}
      <span className="text-muted-foreground mt-2 block text-center text-sm">{title}</span>
    </span>
  );
}
