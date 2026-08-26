import { useEffect } from 'react';
import { OG_LOCALE, SITE_NAME } from '../seo/config';
import type { PageMeta } from '../seo/pageMeta';

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"][data-managed="seo"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    element.setAttribute('data-managed', 'seo');
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(
    `link[rel="${rel}"][data-managed="seo"]`,
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('data-managed', 'seo');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export function usePageMeta(meta: PageMeta) {
  const { title, description, canonical, ogImage, robots } = meta;

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots ?? 'index, follow');

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', ogImage ?? '');
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', OG_LOCALE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage ?? '');

    upsertLink('canonical', canonical);
  }, [title, description, canonical, ogImage, robots]);
}
