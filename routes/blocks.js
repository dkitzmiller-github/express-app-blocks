const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({extended: false});

const blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around it\'s center'
};

router.route('/')
    .get(function (req, res) {
        res.json(Object.keys(blocks));
    })
    .post(parseUrlencoded, function (req, resp) {
        let newBlock = req.body;
        blocks[newBlock.name] = newBlock.description;
        resp.status(201).json(newBlock.name);
    });

router.route('/:name')
    .all(function (req, resp, next) {
        let name = req.params.name;
        let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        req.blockName = block;
        next();
    })
    .get(function (req, resp) {
        // let q = req.query.job;
        // console.log(`query: ${JSON.stringify(req.query)}`);
        // console.log(`params: ${JSON.stringify(req.params)}`);
        if (!blocks[req.blockName]) {
            resp.status(404).json(`Block was not found: ${req.params.name}`);
        } else {
            resp.json(`${req.blockName} : ${blocks[req.blockName]}`);
        }
    })
    .delete(function (req, resp) {
        delete blocks[req.blockName];
        resp.sendStatus(200);
    });


module.exports = router;
