import { marked } from 'marked';

// Fungsi untuk mendapatkan HTML dari markdown
export const getMarkdownText = (markdown) => {
  const rawMarkup = marked(markdown, { sanitize: true });
  return { __html: rawMarkup };
};
