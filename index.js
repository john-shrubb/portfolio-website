const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
	// Base index page

	if (req.url === '/') {
		const page = await fs.readFileSync('./pages/index.html').toString();

		res.setHeader('Content-Type', 'text/html');
		res.end(page);
		return;
	}

	// Static Folder

	if (req.url.startsWith('/public')) {
		try {
			await fs.readFileSync('.' + req.url).toString();
		} catch {
			res.statusCode = 404;
			res.end('<h1>404 Not Found</h1>');
			return;
		}

		if (req.url.endsWith('.css')) {
			res.setHeader('Content-Type', 'text/css');
		} else if (req.url.endsWith('.js')) {
			res.setHeader('Content-Type', 'text/javascript');
		} else if (req.url.endsWith('.png')) {
			res.setHeader('Content-Type', 'image/png')
		} else {
			res.setHeader('Content-Type', 'text/plain');
		}

		res.statusCode = 200;
		fs.createReadStream('.' + req.url).pipe(res);
		return;
	}

	res.statusCode = 404;
	res.statusMessage = 'Not Found';
	res.end('<h1>404 Not Found</h1>');
});

server.listen(8080, '127.0.0.1');