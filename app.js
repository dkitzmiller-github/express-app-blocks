let express = require('express');
let app = express();

// set root directory for static files
app.use(express.static('public'));


let logger = require('./logger');
app.use(logger);

// app.get('/', function(req, res) {
//     res.send('hello world');
// });

// app.get('/nodefunc', function(req, res) {
//     res.write('This is a node function');
//     res.end();
// });

// app.get('/parts', function(req, res) {
//     let parts = ['fixed', 'moveable', 'rotating'];
//     res.send(parts);
// });

// app.get('/blocks', function(req, res) {
//     let blocks = ['fixed', 'moveable', 'rotating'];
//     res.redirect(301, '/parts');
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.param('name', function (req, resp, next) {
//     let name = req.params.name;
//     let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
//     req.blockName = block;
//     next();
// });


const blocks = require('./routes/blocks');
app.use('/blocks', blocks);



const port = 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
