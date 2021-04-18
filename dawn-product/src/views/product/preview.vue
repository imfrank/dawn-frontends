<template>
   <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :span="7"><div class="grid-content bg-purple">
      <el-image
      style="width: 100px; height: 100px"
      :src="productDetail.displayImgUrl"></el-image>
    </div></el-col>
  <el-col :span="5"><div class="grid-content bg-purple">
    <h3>{{productDetail.productName}}
    this is the news page.the transform param is {{this.$route.params.productId}}</h3>
  </div>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  </el-col>
</el-row>
 
<el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="16">
    <div class="grid-content bg-purple">
    <div class="demo-image__preview">
      <el-image 
        style="width: 100px; height: 100px"
        :src="url" 
        :preview-src-list="productDetail.ImageList">
      </el-image>
    </div>
    </div>
    </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>

</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        productDetail:{
          productName:"",
          displayImgUrl: '',
          imageList: [ ]
        }       
      }
    },
    mounted:function(){
     const that=this;
         axios
        .get('http://localhost:59505/api/Product/GetDetail', {
          params: {
              productId:this.$route.params.productId
          }
        })
        .then(res => {
           var  apiRes=res.data;       
           that.productDetail=apiRes.data;
        })
        .catch(err => {
         console.log(err);
        }); 
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 20px;   
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>