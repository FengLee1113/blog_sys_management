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
  const _sql = `insert into
                  tb_category(first_level,second_level,belong_type,create_time,create_person,update_time,update_person,delete_flag)
                  values(?,?,?,now(),'admin',now(),'admin',0);`
  return query( _sql, [ first_level, second_level, belong_type, TYPES.NORMAL,STATUS.NORMAL] )
}

const list = (val) => {
  const {belong_type} = val;
  const _sql = `select
                  id, first_level, second_level, create_person, create_time
                  from
                  tb_category
                  where
                  belong_type = ? and delete_flag = 0
                  order by create_time DESC;`
  return query(_sql, [belong_type, TYPES.NORMAL,STATUS.NORMAL])
}

const del = (val) => {
  const {id} = val
  const _sql = `update tb_category set delete_flag = 1 where id = ?;`
  return query(_sql, [id, TYPES.NORMAL,STATUS.NORMAL])
}

module.exports = {
  add,
  list,
  del
}