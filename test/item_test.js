var http = require('http');
var expect = require('chai').expect;
var item = require('../routes/item');
var request = require('supertest');
var app = require('../app');

var item_id = '';

describe('Item Route', function() {

    // Test for adding item
    describe('#iadd', function() {
        it('Add Item', function(done) {

            var body = {
                item_name: "Test Item Name",
                item_type: "Test Item Type",
                item_desc: "Test Item Description",
                serial_num: "Test Item Serial Number",
                date_purchased: Date.now()
            };

            request(app)
                .post('/items/add')
                .send(body)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err)
                        return done(err);


                    // Get the data that has been saved in the database
                    item_id = JSON.parse(JSON.stringify(res.body))._id;
                    var item_name = JSON.parse(JSON.stringify(res.body)).item_name;
                    var item_type = JSON.parse(JSON.stringify(res.body)).item_type;
                    var item_desc = JSON.parse(JSON.stringify(res.body)).item_desc;
                    var serial_num = JSON.parse(JSON.stringify(res.body)).serial_num;

                    expect(item_name).to.equal("Test Item Name");
                    expect(item_type).to.equal("Test Item Type");
                    expect(item_desc).to.equal("Test Item Description");
                    expect(serial_num).to.equal("Test Item Serial Number");

                    done();
                });
        });
    });

    // Test for listing items
    describe('#iview', function() {
        it('View Item', function(done) {

            request(app)
                .get('/items/' + item_id)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err);

                    /** 
                     * If the returned data has an _id property
                     * the function is successful in executing
                     * its function.
                     **/
                    expect(res.body).to.have.property('_id')

                    done();
                });
        });
    });

    // Test for listing items
    describe('#ilist', function() {
        it('List Items', function(done) {

            request(app)
                .get('/items')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err);

                    var items_length = JSON.parse(JSON.stringify(res.body)).length;
                    expect(items_length).to.be.above(0);
                    
                    done();
                });
        })
    });

    // Test for listing items
    describe('#iedit', function() {
        it('Edit Item', function(done) {
            var body = {
                item_name: 'Mac Book Pro Retina',
                item_type: 'Laptop',
                item_desc: 'Macbook',
                serial_num: '20131114-000001'
            };

            request(app)
                .put('/items/' + item_id)
                .send(body)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err);

                    /**
                     * If the returned data is 1
                     * the function is successful in executing
                     * its function.
                     **/
                    expect(res.body).to.equal(1);

                    done();
                });
        });
    });

    // Test for delete item
    describe('#idelete', function() {
        it('Delete item', function(done) {

            request(app)
                .del('/items/' + item_id)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err)
                        return done(err);

                    /** 
                     * If res.body == 1 meaning delete is successful
                     * If res.body == {} meaning delete is failed
                     **/
                    expect(res.body).to.equal(1);

                    done();
                });
        });
    });

}); // end describe
