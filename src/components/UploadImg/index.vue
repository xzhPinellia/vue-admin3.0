<template>
    <el-upload
        class="avatar-uploader"
        :action="config.action"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="data.image" :src="data.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
import { QiniuToken} from "@/api/common";
export default {
    name: "uploadImg",
    props:{
        imgUrl:{
            type:String,
            default:''
        },
        config:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props, { root, emit }) {
        console.log(props.config)
        const data=reactive({
            image:'',
            uploadKey:{
                token:'',
                key:''
            }
        })

        //获取七牛云token
        const getQiniuToken = () => {
            let requestData = {
                "accesskey": props.config.accesskey,
                "secretkey": props.config.secretkey,
                "buckety": props.config.buckety,
            }
            QiniuToken(requestData).then(response => {
                console.log(response.data)
                data.uploadKey.token=response.data.data.token
            }).catch(error => {
           
            })
        }
        //图片上传
        const handleAvatarSuccess = (res, file) =>{
           let img='${root.$store.getters["common/qiniuUrl"]}${res.key}'
           data.image=img;
           emit("update:imgUrl", img)
        }
        const beforeAvatarUpload = (file) =>{
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                root.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                root.$message.error('上传头像图片大小不能超过 2MB!');
            }
            //文件名转码
            let suffix=file.name
            let key=encodeURI('${suffix}');
            data.uploadKey.key=key
            return isJPG && isLt2M;
        }

        //监听
        watch(()=>props.imgUrl,(value) =>{
           data.image=value
        })

        //页面一加载
        onMounted(()=>{
            getQiniuToken()
        })

        return  {
            data,
            handleAvatarSuccess,beforeAvatarUpload
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>