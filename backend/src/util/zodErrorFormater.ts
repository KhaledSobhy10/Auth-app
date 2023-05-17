import { ZodIssue } from "zod/lib/ZodError";
export const getKeysWithError = (issues: ZodIssue[]) => {
  return issues.map((e: { path: any[]; message: string }) => {
    return { key: e.path[0], message: `${e.path[0]} is ${e.message}` };
  });
};
