var http = require('http');
var should = require('chai').should();
var item = require('../routes/item.js');
var requestify = require('requestify');

describe('Item Route', function() {

    describe('#list', function() {

        it('list items', function(done) {
            requestify.get('http://localhost:3000/items').then(function(response) {
                var list = JSON.stringify(response.body);
                list.should.equal(JSON.stringify(['computer', 'printer', 'lcd']));
            });

            done();
        });

    });

    /*describe('#view', function() {

        it('view an item', function(done) {
            var list = JSON.stringify(item.view());
            list.should.equal(JSON.stringify(['computer', 'printer', 'lcd']));
            done();
        });

    });*/

});
