<template>
    <div id="InfoDetailed">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="信息分类：">
                <el-select v-model="form.categoryId">
                    <el-option v-for="item in data.category" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻标题：">
                <el-input v-model="form.title" style="width:600px"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：">
             <UploadImg :imgUrl="form.imgUrl" :config="uploadImgConfig"/>
            </el-form-item>
             <el-form-item label="发布日期：">
                <el-date-picker v-model="form.dateTime" placeholder="请选择日期" disabled></el-date-picker>
            </el-form-item>
             <el-form-item label="详细内容：">
               <quillEditor v-model="form.content"  ref='myQuillEditor' :options='data.editorOption'/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" :loading='data.submitLoading'>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import { GetList,EdidInfo} from "@/api/news";
import { QiniuToken} from "@/api/common";
import { timestampToTime } from "@/utils/common";
import UploadImg from  "@c/UploadImg"
//富文本编辑器
import {quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: "InfoDetailed",
    components:{quillEditor, UploadImg },
    setup(props, { root, refs }) {
       const uploadImgConfig=reactive({
           action:'http://up-z2.qiniup.com',
           accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTAKJj",
           secretkey: "19AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
           buckety: "webjshtml",
       })
        const data=reactive({
            id:root.$route.query.id,
            category:[],
            editorOption:{},
            submitLoading:false,
            uploadKey:{
                token:''
            }
        })
        const form=reactive({
            categoryId:'',
            title:'',
            dateTime:'',
            content:'',
            imgUrl:''
        })

        //获取信息分类
        const getInfoCategory = () => {
            root.$store.dispatch('common/getInfoCategory').then(response => {
                console.log(response)
                data.category = response
            })
        }
        //获取当前id的信息
         const getList = () => {
             let requestData={
                 pageNumber:1,
                 pageSize:1,
                 id:data.id
             }
            GetList(requestData).then(response => {
                let data = response.data.data.data[0]
                form.categoryId=data.categoryId
                form.title=data.title
                form.dateTime=timestampToTime(data.createDate)
                form.content=data.content
                form.imgUrl=data.imgUrl
                console.log(data)
            }).catch(error => {
            })
        }
        //保存
        const submit = () => {
            let requestData = {
                id: data.id,
                categoryId: form.categoryId,
                title: form.title,
                content: form.content,
                imgUrl:form.imgUrl
            }
            data.submitLoading = true
            EdidInfo(requestData).then(response => {
                let responseData = response.data
                root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
            }).catch(error => {
           
            })
        }
       
        //页面一加载
        onMounted(()=>{
            getInfoCategory()
            getList()
        })

        return  {
            data,form,
            submit,uploadImgConfig
        }
    }
}
</script>
<style lang="scss" scoped>

</style>