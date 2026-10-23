"""Отдаёт sitemap.xml с правильным Content-Type: application/xml"""

SITEMAP_XML = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dickfon.xyz/</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dickfon.xyz/product/dickfon-karaoke</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://dickfon.xyz/product/dickfon-lavalier</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dickfon.xyz/product/dickfon-exclusive</loc>
    <lastmod>2026-04-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>"""


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': ''
        }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/xml; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
        },
        'body': SITEMAP_XML
    }
