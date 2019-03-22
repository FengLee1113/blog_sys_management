const model = require('../model')
const m  = model([
  'add',
  'list',
  'del'
], 'category')
module.exports = {
  ...m
}
