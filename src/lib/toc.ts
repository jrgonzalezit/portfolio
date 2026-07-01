import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown))) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    items.push({ id: slugger.slug(text), level, text });
  }

  return items;
}
