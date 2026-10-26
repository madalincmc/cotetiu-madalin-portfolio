import path from "node:path";
import { createIndex } from "pagefind";
import { getAllPosts, postSlug } from "@/lib/content/blog";
import { getAllProjects, projectSlug } from "@/lib/content/projects";

function structuredDataToText(structuredData: { contents: { content: string }[] }): string {
  return structuredData.contents.map((c) => c.content).join(" ");
}

async function main() {
  const { errors: createErrors, index } = await createIndex({});
  if (createErrors.length > 0 || !index) {
    throw new Error(`Failed to create Pagefind index: ${createErrors.join(", ")}`);
  }

  const projects = getAllProjects();
  for (const project of projects) {
    const slug = projectSlug(project);
    await index.addCustomRecord({
      url: `/projects/${slug}`,
      content: `${project.description} ${structuredDataToText(project.structuredData)}`,
      language: "en",
      meta: { title: project.title, image: project.coverImage },
      filters: { type: ["project"], category: [project.category] },
    });
  }

  // This runs outside `next build`, so NODE_ENV isn't "production" here and getAllPosts() would
  // still include drafts — filter them out explicitly so they never reach the public index.
  const posts = getAllPosts().filter((post) => !post.draft);
  for (const post of posts) {
    await index.addCustomRecord({
      url: `/blog/${postSlug(post)}`,
      content: `${post.description} ${structuredDataToText(post.structuredData)}`,
      language: "en",
      meta: { title: post.title, image: post.coverImage },
      filters: { type: ["post"], category: [post.category] },
    });
  }

  const outputPath = path.join(process.cwd(), "public", "pagefind");
  const { errors: writeErrors } = await index.writeFiles({ outputPath });
  if (writeErrors.length > 0) {
    throw new Error(`Failed to write Pagefind index: ${writeErrors.join(", ")}`);
  }

  console.log(`Pagefind index built: ${projects.length} projects, ${posts.length} posts.`);
}

main().catch((error: unknown) => {
  console.error("Failed to build search index:", error);
  process.exit(1);
});
