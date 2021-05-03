<template>
<el-container>
 <el-aside width="200px" style="height:98.3vh" >
      <el-row class="tac">
          <el-col :span="24">
             <div style="height:100px">
                  <!-- Micro frontend -->
               <div>
                  <el-avatar> user </el-avatar>
              </div>

             </div>
            <el-menu
              default-active="oauth"
              class="el-menu-vertical-demo"
              theme="dark"           
              @open="handleOpen"
              @close="handleClose" router>
              <!-- <el-menu-item  disabled index="/workbench/overview" >
              <i class="el-icon-document"></i>
              <span>概况</span>
            </el-menu-item> -->
              <!-- <el-submenu disabled index="m_oauth">
                 <template #title>  <i class="el-icon-location"></i>
                  <span>授权管理</span></template>
                <el-menu-item-group>  
                  <el-menu-item index="/scope/list">区域列表</el-menu-item>
                  <el-menu-item index="/client/list">客户端列表</el-menu-item>                 
                </el-menu-item-group>                
              </el-submenu> -->
            <el-submenu index="m_product">
     
        <template #title>商品管理</template>
        <el-menu-item-group> 
         <el-menu-item index="/product/list">商品列表</el-menu-item>
        </el-menu-item-group>       
      </el-submenu>
            </el-menu>
            
          </el-col>
      </el-row>
    </el-aside>
  <el-container>
    <el-header style="padding-left: 0px;padding-right: 0px;" >
          <el-menu   class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="/product/list">商品列表</el-menu-item>    
            <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="/ordering/list" disabled>订单管理</el-menu-item> -->
          </el-menu>
    </el-header>
    <el-main>      	           
      <div  id="subapp-container">
         <div id="subapp-viewport"></div>
      </div>
       
      <router-view></router-view>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</el-container>
</template>
<script>
import { registerMicroApps, start, initGlobalState } from 'qiankun';
 import render from '../render/VueRender.js'
export default {         
      mounted(){
           this.loadSubApp();
      },
      methods:{          
           push(subapp) 
           { 
                 history.pushState(null, subapp, subapp) 
                 },
            ok() {       
            console.log(this.$refs.sxx);
        },  
        handleSelect(key, keyPath) {
        console.log(key, keyPath);      
      },
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
          //fetch方法
      //Promise对象
       //第一个.then拿到的是请求头的相关信息
       //url里面传一个json地址
      //  fetch("http://www.0soul.cn:5001/").then(res=>{   
      //         console.log(res)  //拿到的是一个状态码
      //         //用json格式读出来，也可以改为text，得到的就是一个text字符串，但是要做一个json解析，所以极少用text格式
      //         return res.json()  
      //         //第二个.then拿到的是从后端请求回来的真正的数据
      //         }).then(res=>{
      //             console.log(res)
      //         }).catch(err=>{
      //             console.log(err)
      //         })
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },       
           loadSubApp(){
                 render({ loading: true });
                
                    const loader = loading => render({ loading });
        //  const request = url =>
        //     fetch(url, {
        //       referrerPolicy: 'origin-when-cross-origin',
        //       'headers':{
        //          'Access-Control-Allow-Origin': '*'
        //       }
        //     });
                  registerMicroApps([ 
                        {
                        name: 'productList',
                        entry: '//www.0soul.cn:5001/product/list',
                        container: '#subapp-viewport',
                        loader,
                        activeRule: '/product/list',
                      },
                       {
                        name: 'createproduct',
                        entry: '//www.0soul.cn:5001/product/create',
                        container: '#subapp-viewport',
                        loader,
                        activeRule: '/product/create',
                      },
                  ]
  //                 ,{
  //   beforeLoad: [
  //     app => {
  //       console.log('before load', app);
  //     },
  //   ],
  //   beforeMount: [
  //     app => {
  //       console.log('before mount', app);
  //     },
  //   ],
  //   afterMount: [
  //     app => {
  //       console.log('after mount', app);
  //     },
  //   ],
  //   afterUnmount: [
  //     app => {
  //       console.log('after unload', app);
  //       app.render({appContent: '', loading: false});
  //     },
  //   ],
  // },
  // {
  //   fetch: request,
  // },
  );
        
            const { onGlobalStateChange, setGlobalState } = initGlobalState({
                  user: 'qiankun',
            });

            onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

            setGlobalState({
                  ignore: 'master',
                  user: {
                  name: 'master',
                  },
            });              
            //{prefetch: true,fetch:request} 
           start();    
           }
      }
}
</script>