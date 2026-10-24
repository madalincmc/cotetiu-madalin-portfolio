import path from "node:path";
import { createIndex } from "pagefind";
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

  const outputPath = path.join(process.cwd(), "public", "pagefind");
  const { errors: writeErrors } = await index.writeFiles({ outputPath });
  if (writeErrors.length > 0) {
    throw new Error(`Failed to write Pagefind index: ${writeErrors.join(", ")}`);
  }

  console.log(`Pagefind index built: ${projects.length} projects.`);
}

main().catch((error: unknown) => {
  console.error("Failed to build search index:", error);
  process.exit(1);
});
