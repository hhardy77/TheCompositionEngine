// global.d.ts
export {};

declare global {
  interface Window {
    EXCERPTS: Array<{
      id: string;
      author: string;
      text: string;
      genres: string[];
      tags: string[];
    }>;
  }
}
