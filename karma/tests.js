
var chai = require('chai');
var immutable = require('immutable');
var chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

var context = require.context('../src', true, /.+\.test\.js$/);
context.keys().forEach(context);
module.exports = context;
