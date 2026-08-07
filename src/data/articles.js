// Writing registry. Each published article gets its own route at /writing/<slug>.
//
// Bodies are structured blocks rather than raw HTML so ArticleDetail controls
// typography, and so a block type can gain behaviour later without rewriting prose.
// Block types: p | h2 | list | quote | stat | note
//
// NOTHING UNPUBLISHED LIVES HERE. Drafts sit in ./drafts/ and are not imported by
// the app, because a draft merely gated behind a route is still shipped inside the
// JS bundle and can be read by anyone who greps it. Removing it from the import
// graph is the only way it is actually absent.

export const ARTICLES = [];

/**
 * The only list the site renders from: the home-page section, the /writing index,
 * the router, the prerenderer, and the sitemap all read this.
 */
export const PUBLISHED = ARTICLES.filter((a) => a.published);

export const getArticle = (slug) => PUBLISHED.find((a) => a.slug === slug);
