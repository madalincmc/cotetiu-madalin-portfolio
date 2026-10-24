import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/seo/og-image";
import { getAllProjects, getProjectBySlug, projectSlug } from "@/lib/content/projects";

// Not edge: the fumadocs content-layer import pulls in a Node-only dependency.
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// Special files aren't statically generated per-slug unless they export this themselves too.
export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: projectSlug(project) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return renderOgImage({ title: project?.title ?? "Projects", subtitle: project?.description });
}
