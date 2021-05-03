<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
  <el-breadcrumb-item>产品管理</el-breadcrumb-item>
  <el-breadcrumb-item>产品详情</el-breadcrumb-item>
</el-breadcrumb>
<br/>
    <el-form :inline="true" :model="queryData" class="demo-form-inline">
  <el-form-item label="产品名称">
    <el-input v-model="queryData.productName"  placeholder="产品名称"></el-input>
  </el-form-item>
  <el-form-item label="类别">
      <el-select v-model="queryData.categoryId" placeholder="请选择">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
     <el-table    ref="multipleTable"    :data="pageData.items"    tooltip-effect="dark"    style="width: 100%"    @selection-change="handleSelectionChange">
        <el-table-column      type="selection"      width="50">    </el-table-column>
        <el-table-column      label="图片"    width="150">
          <template  #default="scope">
              <img :src="scope.row.displayImgUri" width="120" height="124">
          </template>    
        </el-table-column>
        <el-table-column      prop="productName"      label="名称"      width="200">    </el-table-column>
        <el-table-column      prop="categoryName"      label="产品类别"      width="120">    </el-table-column>
        
        <el-table-column      prop="unitPrice"      label="价格" width="120">    </el-table-column>
        <el-table-column      label="日期"      width="120">    
          <!-- <template  #default="scope">{{ scope.row.date }}</template> -->
        </el-table-column> 
        <el-table-column      prop="remark"      label="备注">    </el-table-column>
         <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        <el-button @click="preview(scope.row.productId)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
     <div style="margin-top: 20px">       
      <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-size="pageData.pageSize"
      layout="prev, pager, next"

      :total="pageData.totalItem"
      >
    </el-pagination>
    </div>
</div> 
</template>

<script>
  import axios from 'axios';
    
  export default {
    data() {
      return { 
        queryData: {
          categoryId:"",      
          productName:""  
        },
        categoryList: [],     
        pageData:{
          pageSize: 10,
          currentPage: 1,
          totalPage: 1,
          totalItem: 0,
          items: []
        },      
        multipleSelection: []
      }
    },
    mounted:function(){      
       var _this = this; 
        axios
        .get('http://1.116.12.73:8000/api/ProductCategory/GetAll')
        .then(function(ajaxMsg){
            _this.categoryList=ajaxMsg.data.data.items;
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });    
        this.init();     
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      preview(proId) {        
        this.$router.push({ path: '/product/preview/'+proId });
      },
      onSubmit() {
       this.init();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      } ,
      handleCurrentChange(val) {
          this.pageData.currentPage = val;  
          this.init();     
      },
      init(){
        const that=this;
         axios
        .get('http://1.116.12.73:8000/api/Product/GetProducts', {
          params: {
            page: that.pageData.currentPage,
            pageSize: that.pageData.pageSize,
            categoryId:that.queryData.categoryId,
            productName:that.queryData.productName,
          }
        })
        .then(res => {
           var  apiRes=res.data;
           this.pageData=apiRes.data;
        })
        .catch(err => {
         console.log(err);
        });
      },
      
    }
  }

</script>