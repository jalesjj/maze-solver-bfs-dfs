const http = require('http');
const fs = require('fs');
const path = require('path');

// Port untuk server
const PORT = process.env.PORT || 3000;

// Mapping ekstensi file ke MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Buat HTTP server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalize URL path, defaulting to 'index.html' untuk root path
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Ambil ekstensi file
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Baca file yang diminta
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File tidak ditemukan
        console.log(`File not found: ${filePath}`);
        fs.readFile('./404.html', (err, content) => {
          if (err) {
            // Jika 404.html juga tidak ada, kirimkan teks sederhana
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            // Kirim halaman 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        console.log(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - kirim file yang diminta
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(``);
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
  console.log(``);
});