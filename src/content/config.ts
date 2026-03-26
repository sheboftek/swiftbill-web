import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(["tips", "tax", "updates"]),
    locale: z.enum(["en", "ar"]),
    author: z.string().default("SwiftBill Team"),
  }),
});

export const collections = { blog };
