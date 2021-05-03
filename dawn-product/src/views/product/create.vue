<template>
 <el-form :model="productForm" :rules="rules" ref="productForm" label-width="100px" class="demo-productForm">
  <el-form-item label="产品名称" prop="productName">
    <el-input v-model="productForm.productName"></el-input>
  </el-form-item>
  <el-form-item label="拿货价" prop="unitPrice">
       <el-input v-model="productForm.unitPrice"></el-input>
  </el-form-item>
    <el-form-item label="产品类别" prop="categoryId">
       <el-input v-model="productForm.categoryId"></el-input>
  </el-form-item>
  
  <el-form-item label="备注" prop="remark">
    <el-input type="textarea" v-model="productForm.remark"></el-input>
  </el-form-item>
   <el-form-item label="产品图片"  >
   <el-upload
  class="upload-demo"
  action="http://1.116.12.73:8000/api/Product/FileUpload"
  :on-preview="handlePreview"
  :on-success="handleAvatarSuccess"
  :on-remove="handleRemove"  
    multiple
  :limit="8"
  :file-list="fileList"
  :on-exceed="handleExceed"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <template #tip>
    <div class="el-upload__tip">
      只能上传 jpg/png 文件，且不超过 500kb
    </div>
  </template>
</el-upload>
  </el-form-item>
 
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('productForm')">立即创建</el-button>
    <el-button @click="resetForm('productForm')">重置</el-button>
  </el-form-item>
</el-form>

</template>

<script>
 import axios from 'axios';
  export default {
    data() {
      return {
        productForm: 
        {
          productName:'',      
          remark:'',
          unitPrice:0,
          categoryId:0,
          ImagesUrls:[]
        },       
      };
    },
    methods: {
      submitForm(formName) {          
         axios.post(`http://1.116.12.73:8000/api/Product/Create`,{
                productName: this.productForm.productName,      
                remark: this.productForm.remark,
                unitPrice:this.productForm.unitPrice,
                ImagesUrls:this.productForm.ImagesUrls,
                categoryId:this.productForm.categoryId
         }).then(res => {
            console.log(res);
            console.log(formName);
            if(res.code==200){
               this.$refs[formName].resetFields();
            }
              this.$router.push({ path: '/product/list' });
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        handleAvatarSuccess(res) {  
           this.productForm.ImagesUrls.push(res.url);
            console.log(this.productForm);
      },
    handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>