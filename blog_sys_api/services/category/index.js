const model = require('../model')
const m  = model([
  'add',
  'list'
], 'category')
module.exports = {
  ...m
}
