var should = require('chai').should();
var item = require('../routes/item.js');

describe('Item Route', function() {

    describe('#list', function() {

        it('list items', function(done) {
            var list = JSON.stringify(item.list());
            list.should.equal(JSON.stringify(['computer', 'printer', 'lcd']));
            done();
        });

    });

    describe('#view', function() {

        it('view an item', function(done) {
		    var list = JSON.stringify(item.view());
            list.should.equal(JSON.stringify(['computer', 'printer', 'lcd']));
            done();
        });

    });

});
