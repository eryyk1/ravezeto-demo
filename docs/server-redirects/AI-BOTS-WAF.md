# AI crawler access — WAF / CDN deployment notes

Ensure server-level security (Cloudflare, nginx, Websupport WAF) does **not** block legitimate AI retrieval bots when `robots.txt` allows them.

## Allowed User-Agent strings

Configure allowlists or disable bot-fight rules for:

- `GPTBot`
- `ChatGPT-User`
- `OAI-SearchBot`
- `ClaudeBot`
- `Claude-User`
- `PerplexityBot`
- `Google-Extended`

## nginx example (comment block in vhost)

```nginx
# GEO/AIO: do not block AI retrieval bots — robots.txt explicitly allows them.
# If using rate limiting, apply a generous zone for these User-Agents or exclude them:
# map $http_user_agent $is_ai_bot {
#   default 0;
#   ~*GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|PerplexityBot|Google-Extended 1;
# }
```

## Cloudflare

- Bot Fight Mode: review false positives for AI crawlers
- WAF custom rules: avoid blanket blocks on unknown bots when `robots.txt` permits retrieval
- Verify `200` responses for `/` and primary routes from each bot User-Agent after deploy

## Verification curl examples

```bash
curl -I -A "GPTBot" https://www.ravezeto.hu/
curl -I -A "ClaudeBot" https://www.ravezeto.hu/rolunk
curl -I -A "PerplexityBot" https://www.ravezeto.hu/felnottkepzes
```

Expected: HTTP `200`, HTML with `lang="hu"`, JSON-LD `@graph` in `<head>` after hydration.
