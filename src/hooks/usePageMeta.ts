import { useEffect } from 'react';
import { OG_LOCALE, SITE_NAME } from '../seo/config';
import type { PageMeta } from '../seo/pageMeta';

const MANAGED_SELECTOR = 'meta[data-managed="seo"]';
const MANAGED_LINK_SELECTOR = 'link[data-managed="seo"]';

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
  useEffect(() => {
    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.robots ?? 'index, follow');

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:image', meta.ogImage ?? '');
    upsertMeta('property', 'og:url', meta.canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', OG_LOCALE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.ogImage ?? '');

    upsertLink('canonical', meta.canonical);
  }, [meta]);
}

export function cleanupManagedSeoTags() {
  document.querySelectorAll(MANAGED_SELECTOR).forEach((node) => node.remove());
  document.querySelectorAll(MANAGED_LINK_SELECTOR).forEach((node) => node.remove());
}
