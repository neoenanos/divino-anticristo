import type { CollectionEntry } from 'astro:content'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'


const parser = new MarkdownIt()
type Post = CollectionEntry<'popurris'> | CollectionEntry<'posts'>;


export function getPostDescription(post: Post, length = 400) : string {
  if (post.data.description) {
    return post.data.description
  }

  post.body??= ''

  const html = parser.render(post.body.replace(/<!--[\s\S]*?-->/g, ''))
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  const skipedTitle = sanitized.split('\n').slice(1).join('\n')
  return skipedTitle.trim().split(' ').filter((w)=>w).slice(0,length).join(' ') + ' [...]'
}