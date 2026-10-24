"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import type { Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export interface GalleryItem {
  path: string;
  alt: string;
  type: "image" | "video";
  /** Intrinsic size, when known, so tall screenshots aren't cropped into a landscape box. */
  width?: number;
  height?: number;
}

const BREAKPOINT_COLUMNS = { default: 3, 1024: 2, 640: 1 };

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState(-1);

  if (items.length === 0) return null;

  const slides: Slide[] = items.map((item) =>
    item.type === "video"
      ? {
          type: "video",
          sources: [{ src: item.path, type: "video/mp4" }],
          alt: item.alt,
        }
      : { type: "image", src: item.path, alt: item.alt },
  );

  return (
    <>
      <Masonry
        breakpointCols={BREAKPOINT_COLUMNS}
        className="-ml-4 flex w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {items.map((item, i) => (
          <button
            key={`${item.path}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open ${item.alt} in the gallery viewer`}
            className="group border-border hover:border-primary/50 mb-4 block w-full overflow-hidden rounded-lg border transition-colors"
          >
            {item.type === "video" ? (
              <video src={item.path} className="w-full" muted playsInline />
            ) : (
              <Image
                src={item.path}
                alt={item.alt}
                width={item.width ?? 600}
                height={item.height ?? 400}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
            )}
          </button>
        ))}
      </Masonry>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Thumbnails, Video]}
      />
    </>
  );
}
