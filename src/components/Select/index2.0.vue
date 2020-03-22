<template>
    <el-select v-model="selectValue">
        <el-option v-for="item in initOptionData" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
export default {
    name: '',
    props:{
        config:{
            type:Object,
            default:()=>{}
        }
    },
    data(){
        return{
             selectValue:"",
            initOptionData:[],
            option:[
                { value:"name",label:"姓名"},
                { value:"phone",label:"手机号"},
                { value:"email",label:"邮箱"},
                { value:"id",label:"ID"},
                { value:"title",label:"标题"},
            ]
        }
    },
    methods:{
         //初始化
        initOption() {
            let initData=props.config.init;
            let optionArr=[];
            //数据校验
            if(initData.length===0){
                return false;
            }
           initData.forEach(item => {
                let arr=data.option.filter(elem =>elem.value ==item);//匹配成功后是个数组，需要下标的第一个
                if(arr.length>0){
                    optionArr.push(arr[0])
                }
            });
            //数据校验
            if(optionArr.length===0){
                return false;
            }
            //初始化赋值
            data.initOption=optionArr
            //初始化搜索类型
            data.selectValue=optionArr[0].value
        }
    },
    watch:{
        config:{
            handler(newValue,oldValue){
                console.log(newValue)
            },
            immediate:true //组件初始化 马上对config 进行监听
        }
    }
}
</script>
<style lang="scss" scoped>

</style>