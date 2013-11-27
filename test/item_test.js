var http = require('http');
var expect = require('chai').expect;
var item = require('../routes/item');
var request = require('supertest');
var app = require('../app');

describe('Item Route', function() {

    describe('#ilist', function() {
        it('List Items', function(done) {
            request(app)
                .get('/items/')
                .set('Accept', 'application/json')
                .expect(200, '[{"__v":0,"_id":"529542428f62033702000001","item_desc":"Macbook","item_name":"MacBookPro","item_type":"Laptop","serial_num":"20131114-000001","date_purchased":"2013-11-27T00:52:18.751Z"}]')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        })
    })

});
