var NodeGeocoder = require('node-geocoder');
const { apiKey } = require('../config');
var options = {
    httpAdapter: 'https',
    provider: 'google',
    apiKey // for Mapquest, OpenCage, Google Premier
};

var geocoder = NodeGeocoder(options);

class Task {
    constructor(address) {
        this.address = address;
    }

    async Info() {
        return await geocoder.geocode(this.address);
    }
}

module.exports = Task;
