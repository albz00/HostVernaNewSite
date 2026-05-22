# Block crawlers on https://booking.hostverna.com

Easy!Appointments runs on a **separate subdomain**. `hostverna.com/robots.txt` does not apply here.

## 1. robots.txt (required)

Copy `robots.txt` from this folder to the **web root** of the booking install (same place as Easy!Appointments `index.php`).

Verify: https://booking.hostverna.com/robots.txt should return:

```
User-agent: *
Disallow: /
```

## 2. X-Robots-Tag (recommended)

If booking is behind **Cloudflare**, either:

- Upload `_headers` from this folder to the booking site’s static output, or
- Add a **Transform Rule** / **Configuration Rule** response header on `booking.hostverna.com`:
  `X-Robots-Tag: noindex, nofollow, noarchive`

## 3. Remove from Google (after deploy)

In [Google Search Console](https://search.google.com/search-console), add the `booking.hostverna.com` property (or use a domain property), then:

- **Removals** → temporarily remove the URL, and/or
- **URL Inspection** → confirm `robots.txt` blocks crawling, then request removal

Sitelinks on the main `hostverna.com` result may take weeks to drop after the booking host is blocked.

## Do not link from the marketing site

Avoid public `<a href>` links to booking from hostverna.com pages; use `/contact` instead so Google does not treat booking as a primary sitelink.
