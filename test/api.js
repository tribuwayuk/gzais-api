// Write some test
var request = require('supertest'),
    should = require('should'),
    assert = require('assert');

describe('You', function() {

  // should make this pass
  it('should pass if Your face is batig nawng', function() {
    var You = {};
    You.face = 'batig nawng';
    You.face.should.equal('batig nawng');
  });

});
