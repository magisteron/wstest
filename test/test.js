var expect = require('chai').expect;
const getData = require('../src/services/Resources')

describe('Get Data', function() {
    it('Data is Object', () => {
        expect(getData).to.be.an('object');
    });
});