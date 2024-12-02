export const generateMetaTags = (post) => {
  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    keywords: post.seo.keywords.join(', '),
    'og:title': post.seo.title || post.title,
    'og:description': post.seo.description || post.excerpt,
    'og:image': post.featuredImage,
    'og:url': window.location.href,
    'twitter:card': 'summary_large_image',
    'twitter:title': post.seo.title || post.title,
    'twitter:description': post.seo.description || post.excerpt,
    'twitter:image': post.featuredImage
  };
};

export const updateMetaTags = (tags) => {
  Object.entries(tags).forEach(([name, content]) => {
    if (!content) return;

    // Update standard meta tags
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);

    // Update OpenGraph meta tags
    if (name.startsWith('og:')) {
      let ogMeta = document.querySelector(`meta[property="${name}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', name);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    }
  });
};