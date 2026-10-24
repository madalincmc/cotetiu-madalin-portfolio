import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/seo/og-image";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ title: siteConfig.title, subtitle: siteConfig.tagline });
}
