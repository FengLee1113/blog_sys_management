const pool = require('../../lib')
const { NtNUpdate } = require('../../helper')
const { query } = pool
const STATUS = require('../../enum')
const TYPES = {
  NORMAL: 0,
}
// 新建分类
const add = (val) => {
  const { first_level, second_level, belong_type } = val
  const _sql = `insert into tb_category(first_level,second_level,belong_type,create_time,create_person,update_time,update_person,delete_flag)
                values(?,?,?,now(),'admin',now(),'admin',0);`
  return query( _sql, [ first_level, second_level, belong_type, TYPES.NORMAL,STATUS.NORMAL] )
}

module.exports = {
  add
}