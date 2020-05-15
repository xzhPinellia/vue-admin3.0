<template>
    <el-dialog title="新增" :visible.sync="data.dialog_info_flag" @close="close" width="700px" @opened="openDialog">
        <el-form :model="data.form" :rules="data.rules" ref="addInfoForm">
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
            <el-button type="danger" :loading="data.submitLoading" @click="submit('addInfoForm')">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import sha1 from 'js-sha1'
import { reactive, ref, watch, onBeforeMount } from '@vue/composition-api';
import  CityPicker from "@c/CityPicker"
import {GetRole,GetSystem,UserAdd,UserEdit} from "@/api/user"
import { stripscript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
export default {
    name: 'dialogInfo',
    components:{CityPicker},
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        eidtData: {
            type: Object,
            default: () => {}
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
         // 验证用户名
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
          //1.编辑状态  需要校验: data.form.id 存在并且密码不为空
          //不需要校验  data.form.id 存在并且密码为空
          //添加状态 需要校验: data.form.id 不存在
          if(data.form.id && !value){
              callback();
          }
          if(data.form.id && value){
            // 过滤后的数据
            if(value){
                data.form.password = stripscript(value);
                value = data.form.password;
            }
            if (value === '') {
                callback(new Error("请输入密码"));
            } else if (validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母"));
            } else{ 
                callback();
            }
          }else{
            // 过滤后的数据
            if(value){
                data.form.password = stripscript(value);
                value = data.form.password;
            }
            if (value === '') {
                callback(new Error("请输入密码"));
            } else if (validatePass(value)) {
                callback(new Error("密码为6至20位数字+字母"));
            } else {
                callback();
            }
          }
        
      };
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
            submitLoading: false,
            rules:reactive({
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                role: [
                    { required:true,message:'请选择角色',trigger: 'blur' }
                ]
            })
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
            //获取角色  getSystem() 系统
             getRole();//角色分配路由
             //初始值处理
             let eidtData=props.eidtData
             if(eidtData.id){//编辑
                eidtData.role=eidtData.role.split(',')
             }else{//添加
                data.form.id && delete data.form.id
             }
             for(let key in eidtData){
                     data.form[key]=eidtData.id ? eidtData[key] : ''
             }
            
        }
        const resetForm = () => {
            data.cityPickerData={}
            refs.addInfoForm.resetFields();
        }
        const submit = (formName) => {
            refs[formName].validate((valid) => {
            // 表单验证通过
            if (valid) {
             //数据处理
                let requestData=Object.assign({},data.form)
                requestData.role=requestData.role.join("");
                requestData.region=JSON.stringify(data.cityPickerData)
               
                //添加状态 需要密码 加密
                //编辑状态 存在 需要密码 并且加密 否则 删除
                if(requestData.id){
                    if(requestData.password){
                         requestData.password=sha1(requestData.password)
                    }else{
                        delete requestData.password
                    }
                    UserEdits(requestData)
                }else{
                     requestData.password=sha1(requestData.password)
                    UserAdds(requestData)
                }
               
            } else {
                console.log('error submit!!');
                return false;
            }
            })
        }
        //添加
        const UserAdds=(requestData)=>{
             UserAdd(requestData).then(res =>{
                    let data=res.data
                    console.log(data)
                    root.$message({
                        message:data.message,
                        type:"success"
                    })
                    //关闭弹窗
                    close();
                    emit('refreshTableData')
             })
        }
        //编辑
         const UserEdits=(requestData)=>{
             UserEdit(requestData).then(res =>{
                    let data=res.data
                    console.log(data)
                    root.$message({
                        message:data.message,
                        type:"success"
                    })
                    //关闭弹窗
                    close();
                    emit('refreshTableData')
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