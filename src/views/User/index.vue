<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="label-wrap">
                    <label>关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                               <SelectVue :config='data.configOption' :selectData.sync="data.selectData"/>
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="data.key_word" placeholder="请输入关键字"></el-input>
                            </el-col>
                            <el-col :span="15">
                                <el-button type="danger" @click="search">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                 <el-button type="danger" class="pull-right" @click="data.dialog_add = true">添加用户</el-button>
            </el-col>
        </el-row>
        <div class="topH"></div>
        <TableVue ref="userTable" :config='data.configTable' :tableRow.sync="data.tableRow">
            <template v-slot:status='slotData'>
                <el-switch @change="handlerSwitch(slotData.data)" v-model="slotData.data.status"   active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation='slotData'>
                <el-button size="small" type="success" @click="handlerEidt(slotData.data)">编辑</el-button>
                <el-button size="small" type="danger"  @click="handlerDel(slotData.data)">删除</el-button>
            </template>
            <template v-slot:tableFooterLeft>
                <el-button size="small" type="danger" @click="handlerBatchDel()">批量删除</el-button>
            </template>
        </TableVue>
         <!--新增弹窗-->
        <DialogAdd :flag.sync="data.dialog_add" :eidtData='data.eidtData' @refreshTableData="refreshData" />
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import {UserDel ,UserActives}  from '@/api/user';
//组件
import DialogAdd from "./dialog/add";
import  SelectVue  from '@c/Select'
import  TableVue  from '@c/Table'
//3.0
import {global } from "@/utils/global_V3.0"
export default {
    name: 'infoIndex',
    components:{SelectVue,TableVue,DialogAdd},
    setup(props,{root,refs}) {
        const {confirm} =global();
        const userTable=ref(null)
        const data =reactive({
            //tableRow
           tableRow:{},
           eidtData:{},
           dialog_add:false,
           //下拉的值
           selectData:{},
           //搜索关键字
           key_word:"",
           //阻止状态
           updateStatusFlag:false,
           configOption:{
               init:["name","phone"]
           },
           configTable:{
               selection:true,
               tHead:[
                   {
                       label:'邮箱',
                       field:'username'
                   },
                   {
                       label:'真实姓名',
                       field:'truename'
                   },
                   {
                       label:'手机号',
                       field:'phone'
                   },
                   {
                       label:'地区',
                       field:'region'
                   },
                   {
                       label:'角色',
                       field:'role'
                   },
                    {
                       label:'禁启用状态',
                       field:'status',
                       columnType:'slot',
                       slotName:'status'
                   },
                    {
                       label:'操作',
                       columnType:'slot',
                       slotName:'operation'
                   }
               ],
               //请求接口
               requestData:{
                   url:'getUserList',
                   method:'post',
                   data:{
                       pageNumber:1,
                       pageSize:10
                   }
               }
           },
        })
        //
        const handlerBatchDel = ()=>{
           console.log(data.tableRow)
           let userId=data.tableRow.idItem
           if(!userId || userId.length ===0){
               root.$message({
                   message:"请勾选需要删除的用户！！！",
                   type:"error"
               })
               return false;
           }
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: userDelete
            })
        }
        //删除用户
        const userDelete =()=>{
            UserDel({id:data.tableRow.idItem}).then((res)=>{
                console.log(res)
                //第一种
                // refs.userTable.refreshData()
                refreshData()

           })
        }
        //刷新数据
        const refreshData=() =>{
            refs.userTable.refreshData()
        }
         //
         const handlerDel=(params)=>{
             data.tableRow.idItem=[params.id]
              confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: userDelete
            })
         }
         //编辑
         const handlerEidt= (params)=>{
                data.dialog_add=true
                data.eidtData=Object.assign({},params)
         }
         //改变禁用状态
          const handlerSwitch=(params)=>{
             let requestData={
                 id:params.id,
                 status:params.status
             }
             UserActives(requestData).then(res=>{
                 if(data.updateStatusFlag){return false}
                 data.updateStatusFlag=true
                root.$message({
                    message:res.data.message,
                    type:"success"
                })
                  data.updateStatusFlag= !data.updateStatusFlag
             }).catch(error=>{
                 data.updateStatusFlag= !data.updateStatusFlag
             })
              
         }
         //搜搜
         const search= ()=>{
                let requestData={
                    [data.selectData.value]:data.key_word
                }
                console.log(requestData)
                refs.userTable.paramsLoadData(requestData)
         }
         
        return {
            data,
            handlerDel,
            handlerBatchDel,
            refreshData,
            handlerSwitch,
            handlerEidt,
            search
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
     @include labelDom(left, 60, 40); 
}
.topH{
    margin-bottom: 20px
}
</style>