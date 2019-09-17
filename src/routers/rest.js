const express = require('express');
const router = express.Router();
const restMethods = require('./restMethods')

let SAMPLE_BOOK = [];

router.get('/', async (req, res) => {
    res.send({ data: SAMPLE_BOOK })
});

router.post('/create', async (req, res) => {
    let { address } = req.body
    let out = await restMethods.makeMarker(address);
    if(out.data) {
        SAMPLE_BOOK = [...SAMPLE_BOOK, out.data]
    }
    res.send({newMarker: out})
});

router.post('/delete', (req, res) => {
    let { id } = req.body
    let exist = false
    SAMPLE_BOOK = SAMPLE_BOOK.filter(obj => {
        if(obj.id === id) exist = true;
        return obj.id !== id
    })
    return res.send(exist)
});

router.post('/update', async (req, res) => {
    let { id, address } = req.body
    let out = await restMethods.update(id, address, SAMPLE_BOOK);
    return res.send(out)
});

module.exports = router;