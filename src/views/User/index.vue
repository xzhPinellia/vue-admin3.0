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
        <TableVue :config='data.configTable'>
            <template v-slot:status='slotData'>
                <el-switch v-model="slotData.data.status"   active-value="2" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
             <template v-slot:operation='slotData'>
                <el-button size="small" type="success" @click="deletes(slotData.data)">编辑</el-button>
                <el-button size="small" type="danger"  @click="deletes(slotData.data)">删除</el-button>
            </template>
        </TableVue>
         <!--新增弹窗-->
        <DialogAdd :flag.sync="data.dialog_add" />
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import DialogAdd from "./dialog/add";
import  SelectVue  from '@c/Select'
import  TableVue  from '@c/Table'
export default {
    name: 'infoIndex',
    components:{SelectVue,TableVue,DialogAdd},
    setup(props) {
        const data =reactive({
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
        const deletes = (data)=>{
           
        }
        return {
            data,deletes
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