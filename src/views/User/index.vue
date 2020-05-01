<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="label-wrap">
                    <label>关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                               <SelectVue :config='data.configOption'/>
                            </el-col>
                            <el-col :span="5">
                                <el-input placeholder="请输入关键字"></el-input>
                            </el-col>
                            <el-col :span="15">
                                <el-button type="danger">搜索</el-button>
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
                <el-switch v-model="slotData.data.status"   active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation='slotData'>
                <el-button size="small" type="success">编辑</el-button>
                <el-button size="small" type="danger"  @click="handlerDel(slotData.data)">删除</el-button>
            </template>
            <template v-slot:tableFooterLeft>
                <el-button size="small" type="danger" @click="handlerBatchDel()">批量删除</el-button>
            </template>
        </TableVue>
         <!--新增弹窗-->
        <DialogAdd :flag.sync="data.dialog_add" />
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import {UserDel}  from '@/api/user';
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
        const data =reactive({
            //tableRow
           tableRow:{},
           dialog_add:false,
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
                refs.userTable.refreshData()
           })
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
        return {
            data,
            handlerDel,
            handlerBatchDel
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