<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
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
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        activeName: 'article',
        tableData: []
      };
    },
    mounted(){
      axios.post('/api/category/list', {
        belong_type: this.activeName
      }).then((result) => {
        if (result.data.retCode === 200) {
          this.tableData = result.data.retValue
        }
      })
    },
    methods: {
      handleClick(tab, event) {
        axios.post('/api/category/list', {
          belong_type: this.activeName
        }).then((result) => {
          const data = result.data
          if (data.retCode === 200) {
            this.tableData = data.retValue
          }
        })
      }
    }
  };
</script>
<style>

</style>