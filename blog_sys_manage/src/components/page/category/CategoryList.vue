<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="文章" name="article">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="first_level"
                label="一级分类">
            </el-table-column>
            <el-table-column
                prop="second_level"
                label="二级分类">
            </el-table-column>
            <el-table-column
                prop="create_person"
                label="创建人">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="图库" name="image">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="first_level"
                label="一级分类">
            </el-table-column>
            <el-table-column
                prop="second_level"
                label="二级分类">
            </el-table-column>
            <el-table-column
                prop="create_person"
                label="创建人">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="创建时间">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
              <template slot-scope="scope">
                <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import dateFns from 'date-fns'
  import {Message} from 'element-ui'
  export default {
    data() {
      return {
        activeName: 'article',
        tableData: []
      };
    },
    mounted() {
      this.selectList()
    },
    methods: {
      handleClick(tab, event) {
        this.selectList()
      },
      selectList(){
        axios.post('/api/category/list', {
          belong_type: this.activeName
        }).then((result) => {
          const data = result.data
          if (data.retCode === 200) {
            data.retValue.map((item) => {
              item.create_time = this.formatDate(item.create_time)
              return item
            })
            this.tableData = data.retValue
          }
        })
      },
      deleteRow(index, data){
        axios.post('/api/category/del', {
          id: data[index].id
        }).then((result) => {
          const data = result.data
          if (data.retCode === 200) {
            Message.success('删除成功')
            setTimeout(this.selectList, 1000)
          }
        })
      },
      formatDate(date) {
        return dateFns.format(date, 'YYYY-HH-MM HH:mm:ss')
      }
    }
  };
</script>
<style>

</style>