// types.d.ts
// Tell VS Code (TypeScript) what ./data.js exports so JS imports resolve without errors.
declare module "./data.js" {
  export const EXCERPTS: Array<{
    id: string;
    author: string;
    text: string;
    genres: string[];
    tags: string[];
  }>;
}
