<template>
    <el-select v-model="data.selectValue" @change="select">
        <el-option v-for="item in data.initOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        },
    selectData:{
            type:Object,
            default:()=>{}
        },
    },
    setup(props,{root,emit}) {
        const data =reactive({
            selectValue:"",
            initOption:[],
            option:[
                { value:"name",label:"姓名"},
                { value:"phone",label:"手机号"},
                { value:"email",label:"邮箱"},
                { value:"id",label:"ID"},
                { value:"title",label:"标题"},
            ]
        })
        //初始化
        let initOption=() =>{
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
        //选择的值
        const select= (val)=>{
            let filterData=data.option.filter(item => item.value == val)[0]
             emit("update:selectData",filterData)
        }
        onMounted(()=>{
            initOption()
        })
        return {
            data,select
        }
    }
}
</script>
<style lang="scss" scoped>

</style>