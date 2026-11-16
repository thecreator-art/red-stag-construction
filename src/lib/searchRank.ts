// Pure ranking logic, shared by the build (search index) and the browser.

export type SearchDocType = 'Service' | 'Service Area' | 'Project' | 'Cost Guide' | 'Article' | 'Page';

export interface SearchDoc {
  title: string;
  url: string;
  type: SearchDocType;
  description: string;
  /** Extra terms to match against (city, keyword, etc.). */
  keywords: string;
}

/** Ranked, case-insensitive search across titles, descriptions and keywords. */
export function rankDocs(docs: SearchDoc[], query: string, limit = 40): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return docs
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const keywords = doc.keywords.toLowerCase();
      const description = doc.description.toLowerCase();
      const haystack = `${title} ${keywords} ${description}`;

      let score = 0;
      for (const term of terms) {
        if (!haystack.includes(term)) return { doc, score: -1 }; // every term must appear
        if (title === term) score += 100;
        if (title.startsWith(term)) score += 40;
        if (title.includes(term)) score += 25;
        if (keywords.includes(term)) score += 10;
        if (description.includes(term)) score += 4;
      }
      if (title.includes(q)) score += 30;
      return { doc, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.doc);
}
