<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-favor"></i>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>创建分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref='categoryForm' :model="categoryForm" :rules="rules" label-position="left" label-width='150px'
                     size="medium">
                <el-form-item label='所属类型' prop='belong_type'>
                    <el-select v-model="categoryForm.belong_type" placeholder="请选择添加分类的类型">
                        <el-option v-for="type in belongTypes" :key="type.id" :value='type.value'
                                   :label='type.text'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="一级分类" prop='first_level'>
                    <el-input v-model="categoryForm.first_level" placeholder="请输入一级分类（如技术）"></el-input>
                </el-form-item>
                <el-form-item label="二级分类" prop='second_level'>
                    <el-input v-model="categoryForm.second_level" placeholder="请输入二级分类（如java）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('categoryForm')">创建</el-button>
                    <el-button type="primary" @click="resetForm('categoryForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        categoryForm: {
          belong_type: '',
          first_level: '',
          second_level: ''
        },
        belongTypes: [{
          id: 'article',
          text: '文章',
          value: 'article',
        }, {
          id: 'iamge',
          text: '图片',
          value: 'image',
        }],
        rules: {
          belong_type: [{
            required: true,
            message: '请选择所属类型',
            trigger: 'change'
          }],
          first_level: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        let formData = {}
        this.$refs[formName].validate((valid, field) => {
          if (valid) {
            this.$refs[formName].fields.map((item) => {
              formData[item.prop] = item.fieldValue
            })
            axios.post('/api/category/add', formData)
              .then((response) => {
                console.log(response)
                if (response.data.code === 0) {
                  this.$refs[formName].resetFields();
                }
              })
          } else {
            console.log(field)
          }
        })

        // console.log(formData)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>

</style>