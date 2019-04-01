const logger = function(req, resp, next) {
    let start = + new Date();

    let detail = {
        stream: process.stdout,
        url: req.url,
        method: req.method,
        obj: req
    };

    resp.on('finish', () => {
         let duration = + new Date() - start;
         let msg = `${detail.method} - ${detail.url} took ${duration}ms\n`;
         detail.stream.write(`${msg}\n`);
    });
    next();
};

module.exports = logger;
