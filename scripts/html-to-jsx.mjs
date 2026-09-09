const LINK_MAP = {
  'final-fooldal.html': '/',
  'final-csapatunk.html': '/rolunk',
  'final-tanacsadas.html': '/tanacsadas',
  'final-felnottkepzes.html': '/felnottkepzes',
  'final-referenciak.html': '/referenciak',
  'final-palyazatok.html': '/palyazatok',
  'final-kapcsolat.html': '/kapcsolat',
  'final-adatvedelem.html': '/jogi/adatvedelem',
  'final-impresszum.html': '/jogi/impresszum',
};

const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  autocomplete: 'autoComplete',
  crossorigin: 'crossOrigin',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  viewbox: 'viewBox',
  preserveaspectratio: 'preserveAspectRatio',
  patterntransform: 'patternTransform',
  basefrequency: 'baseFrequency',
  numoctaves: 'numOctaves',
  stitchtiles: 'stitchTiles',
  pathlength: 'pathLength',
  referrerpolicy: 'referrerPolicy',
};

function convertStyle(style) {
  const entries = style
    .split(';')
    .map((r) => r.trim())
    .filter(Boolean)
    .map((rule) => {
      const idx = rule.indexOf(':');
      if (idx === -1) return null;
      const key = rule
        .slice(0, idx)
        .trim()
        .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const value = rule.slice(idx + 1).trim();
      return `${key}: '${value.replace(/'/g, "\\'")}'`;
    })
    .filter(Boolean);
  return `{ ${entries.join(', ')} }`;
}

function convertAttributes(tag) {
  return tag.replace(/([\w:@-]+)=("([^"]*)"|'([^']*)')/g, (match, rawName, _q, dbl, sgl) => {
    const lower = rawName.toLowerCase();
    const value = dbl ?? sgl ?? '';

    if (lower === 'onclick' || lower === 'onsubmit') return '';
    if (lower === 'onerror') return 'onError={(e) => e.currentTarget.remove()}';
    if (lower === 'style') return `style={${convertStyle(value)}}`;

    const name = ATTR_MAP[lower] ?? rawName;
    return `${name}="${value}"`;
  });
}

function convertInternalLinks(html) {
  const parts = html.split(/(<\/?a\b[^>]*>)/gi);
  let depth = 0;
  return parts
    .map((part) => {
      if (/^<a\b/i.test(part)) {
        const hrefMatch = part.match(/href="([^"]+)"/i);
        const href = hrefMatch?.[1];
        if (href && LINK_MAP[href]) {
          depth += 1;
          return convertAttributes(part)
            .replace(/href="[^"]+"/i, `to="${LINK_MAP[href]}"`)
            .replace(/^<a/i, '<Link');
        }
        return convertAttributes(part);
      }
      if (/^<\/a>/i.test(part)) {
        if (depth > 0) {
          depth -= 1;
          return '</Link>';
        }
        return '</a>';
      }
      return part;
    })
    .join('');
}

function convertTags(html) {
  let jsx = html.replace(/<!--[\s\S]*?-->/g, '');
  jsx = convertInternalLinks(jsx);

  jsx = jsx.replace(/<\/?([a-zA-Z0-9:-]+)([^>]*?)>/g, (full, tagName, attrs) => {
    if (full.startsWith('</')) return full;
    if (tagName.toLowerCase() === 'a' || tagName === 'Link') {
      return convertAttributes(full);
    }

    const convertedAttrs = convertAttributes(`<x${attrs}>`).slice(2, -1);
    const selfClosing = /^(area|base|br|col|embed|hr|img|input|link|meta|path|source|track|wbr)$/i.test(
      tagName,
    );

    if (selfClosing) {
      const attrsClean = convertedAttrs.replace(/\/\s*$/, '');
      return `<${tagName}${attrsClean} />`;
    }

    return `<${tagName}${convertedAttrs}>`;
  });

  jsx = jsx.replace(/\sclass=/gi, ' className=');
  jsx = jsx.replace(/\sfor=/gi, ' htmlFor=');
  for (const [from, to] of Object.entries(ATTR_MAP)) {
    if (from === 'class' || from === 'for') continue;
    jsx = jsx.replace(new RegExp(`\\s${from}=`, 'gi'), ` ${to}=`);
  }

  jsx = jsx.replace(/\saction="#"/gi, '');
  jsx = jsx.replace(/\smethod="post"/gi, '');
  jsx = jsx.replace(/"\s*\/\s*\/>/g, '" />');

  return jsx;
}

export function htmlToJsx(html) {
  return convertTags(html.trim());
}
