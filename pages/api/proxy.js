function rewriteScriptSrcToLocalhost(html) {
  html = html.replace(
    /https:\/\/cdn.ampproject.org\/(rtv\/\d+\/)?v0.js/,
    'http://localhost:8000/dist/amp.js'
  );
  html = html.replace(
    /https:\/\/cdn.ampproject.org\/(rtv\/\d+\/)?v0\/(\S+?).js/g,
    'http://localhost:8000/dist/v0/$2.max.js'
  );
  html = html.replace(
    /http:\/\/localhost:8000\/dist\/v0\/amp-viewer-integration-gmail-0.1.max.js/,
    `https://cdn.ampproject.org/rtv/032009190410000/v0/amp-viewer-integration-gmail-0.1.js`
  );
  return html;
}

/**
 * 
 * @param {string} html 
 */
function ensureViewerIntegration(html) {
  if (html.includes('amp-viewer-integration-0.1.js')) {
    return html;
  }
  const viewerIntegrationScript = `<script async src="https://cdn.ampproject.org/v0/amp-viewer-integration-0.1.js"></script>`;
  return html.replace('<head>', `<head>${viewerIntegrationScript}`);
}

async function handler(req, res) { 
  try { 
    const url = req.query.url
    const html = await fetch(url).then(response =>response.text());

    let rewrittenHtml = ensureViewerIntegration(html);
    if (req.query.local) {
      rewrittenHtml = rewriteScriptSrcToLocalhost(rewrittenHtml);
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html') 
    res.end(rewrittenHtml);
  } catch (err) {
    res.statusCode = 500
    res.end(err.message);
  } 
}

export default handler;
