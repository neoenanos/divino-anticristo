import type { CollectionEntry } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'


const parser = new MarkdownIt()
type Post = CollectionEntry<'posts'>

export function getPostDescription(post: Post, length = 400) : string {
  if (post.data.description) {
    return post.data.description
  }

  const html = parser.render(post.body || '')
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  return sanitized.trim().split(' ').filter((w)=>w).slice(0,20).join(' ') + ' [...]'
}