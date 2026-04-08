import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('popurris');
  return rss({
    title: 'Projecto Divino Anticristo',
    description: 'Projecto de Obras Completas: Divino Anticristo',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>es-CL</language>`,
  });
}