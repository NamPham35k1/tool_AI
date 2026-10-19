import { z } from "zod";

export const gitRebaseVsMergeSchema = z.object({
  title: z.string().default("Git Rebase vs Merge"),
  subtitle: z.string().default("Khác nhau thế nào & khi nào nên dùng?"),
});

export type GitRebaseVsMergeProps = z.infer<typeof gitRebaseVsMergeSchema>;
