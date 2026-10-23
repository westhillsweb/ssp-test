// server.js v0.0.2 (2026-10-23, SSP-Comms Special-110, Step 0a hosting probe)
// The smallest possible Honu web process, used only to prove SiteGround's Node.js hosting works at
// honunui.surfshackproperties.com before any real code is written (spec 06 Step 0a). It has no
// libraries, reads no data and holds no secrets. GET /health answers with the service name and
// version; everything else answers 404. SiteGround gives the port in the PORT variable.
'use strict';
const http = require('node:http');
const { version } = require('./package.json');

const startedAt = new Date().toISOString();

function handle(req, res) {
  const path = (req.url || '/').split('?')[0];
  if (req.method === 'GET' && (path === '/health' || path === '/api/v1/health')) {
    const body = JSON.stringify({ ok: true, service: 'honu-api', version, startedAt, pid: process.pid, node: process.version });
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    res.end(body);
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not found' }));
}

function start(port) {
  const server = http.createServer(handle);
  server.listen(port);
  return server;
}

module.exports = { handle, start };

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  start(port);
  console.log('honu-api ' + version + ' listening on port ' + port);
}
