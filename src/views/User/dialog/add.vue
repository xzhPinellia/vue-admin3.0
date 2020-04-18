<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="700px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="username">
                 <el-input v-model="data.form.username" placehoder="请输入用户名"></el-input>
            </el-form-item>
             <el-form-item label="密码：" :label-width="data.formLabelWidth" prop="password">
                 <el-input v-model="data.form.password" placehoder="请输6-20数字字母"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="data.formLabelWidth" prop="truename">
                 <el-input v-model="data.form.truename" placehoder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" :label-width="data.formLabelWidth" prop="phone">
                <el-input v-model.number="data.form.phone" placehoder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区：" :label-width="data.formLabelWidth" prop="region">
                <CityPicker  :cityPickerData.sync='data.cityPickerData'/>
                {{data.cityPickerData}}
            </el-form-item>
             <el-form-item label="是否启用：" :label-width="data.formLabelWidth" prop="status">
                 <el-radio v-model="data.form.status" label="1">禁用</el-radio>
                 <el-radio v-model="data.form.status" label="2">启用</el-radio>
            </el-form-item>
             <el-form-item label="角色：" :label-width="data.formLabelWidth" prop="role">
                 <el-checkbox-group v-model="data.form.role">
                    <el-checkbox v-for="item in data.roleItem" :label="item.role" :key='item.role' ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import sha1 from 'js-sha1'
import { reactive, ref, watch, onBeforeMount } from '@vue/composition-api';
import  CityPicker from "@c/CityPicker"
import {GetRole,UserAdd} from "@/api/user"
export default {
    name: 'dialogInfo',
    components:{CityPicker},
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        category: {
            type: Array,
            default: () => []
        }
    },
    // vue2.0
    // data(){
    //     return  {
    //         dialog_info_flag: false,
    //         formLabelWidth: '70px',
    //         form: {
    //             category: '',
    //             title: '',
    //             content: ''
    //         },
    //         categoryOption: [],
    //         submitLoading: false
    //     }
    // },
    setup(props, { emit, root, refs }){
        /**
         * 数据
         */
        const data = reactive({
            dialog_info_flag: false,  // 弹窗标记
            cityPickerData:{},
            formLabelWidth: '90px',
            form: {
                username: '',
                truename: '',
                password: '',
                phone:'',
                region:'',
                status:'1',
                role:[]
            },
            roleItem:[],
            // 分类下拉
            categoryOption: ['A'],
            // 按钮加载
            submitLoading: false
        });
        //请求角色
        const getRole= ()=>{
            GetRole().then(res=>{
                data.roleItem=res.data.data
            })
        }
        // watch
        watch(() => data.dialog_info_flag = props.flag);
        /**
         * vue2.0 methods
         */
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }
        //弹窗打开调用
        const openDialog = () => {
             getRole()
        }
        const resetForm = () => {
            data.cityPickerData={}
            refs.addInfoForm.resetFields();
        }
        const submit = () => {
             if(!data.form.username){
                root.$message({
                    message:"用户名不为空！！",
                    type:"error"
                })
                return false
            }
            if(!data.form.password){
                root.$message({
                    message:"密码不为空！！",
                    type:"error"
                })
                return false
            }
            if(data.form.role.length===0){
                root.$message({
                    message:"请选择角色类型！！",
                    type:"error"
                })
                return false
            }
            //数据处理
            let requestData=Object.assign({},data.form)
            requestData.role=requestData.role.join("");
            requestData.region=JSON.stringify(data.cityPickerData)
            requestData.password=sha1(requestData.password)
            UserAdd(requestData).then(res =>{
                let data=res.data
                console.log(data)
                root.$message({
                    message:data.message,
                    type:"success"
                })
                resetForm()
            })
        }
        return {
            data,
            // methods
            close, openDialog, submit
        }
    }
}
</script>
<style scoped>

</style>