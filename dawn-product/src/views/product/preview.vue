<template>
   <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :span="7">
    <div class="grid-content bg-purple">
       <el-image  :src="productInfo.displayImgUri"  style="width: 400px; height: 385px">
      <template #placeholder>
        <div class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </template>
    </el-image>
    </div>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple">
    <h3>{{productInfo.productName}}</h3>
  </div>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4">  </el-col>
  <el-col :span="14">
    <div class="grid-content bg-purple">
     <ul>
      <li v-for="imgUri in productInfo.imageUrls" :key="imgUri">
        <el-image   :src="imgUri" >      </el-image>
      </li>
    </ul> 
    </div></el-col>
</el-row>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        productInfo:{
          productName:"",
          displayImgUri: '',
          imageUrls:[]
        }       
      }
    },
    mounted:function(){
     const that=this;
         axios
        .get('http://1.116.12.73:8000/api/Product/GetDetail', {
          params: {
              productId:this.$route.params.productId
          }
        })
        .then(res => {
           var  apiRes=res.data;       
           that.productInfo=apiRes.data;
            console.log(apiRes.data);
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