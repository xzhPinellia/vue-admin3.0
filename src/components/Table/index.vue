<template>
   <el-table :data='data.tableData' border style="width:100%">
       <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
       <template v-for="item in data.tableConfig.tHead">
           <!-- v-slot-->
           <el-table-column  :key="item.field" :prop="item.field" :label="item.label" v-if="item.columnType ==='slot'">
                <template slot-scope="scoped" >
                    <slot :name='item.slotName' :data='scoped.row'></slot>
                </template>
           </el-table-column>
           <!-- table数据-->
            <el-table-column
                :key="item.field"
                :prop="item.field"
                :label="item.label"
                v-else>
            </el-table-column>
       </template>
      
   </el-table>
</template>
<script>
import { reactive, ref, watch, onMounted, onBeforeMount } from '@vue/composition-api';
export default {
    name: "tableVue",
    props:{
        config:{
            type:Object,
            default:()=>{}
        }
    },
    setup(props, { root, emit }) {
        console.log(props.config)
        const data=reactive({
            tableConfig:{
                selection:true,
                tHead:[]
            },
            tableData:[
                {
                    email:"12312@qq.com",
                    name:"曹操",
                    phone:"199999999",
                    address:"安徽合肥",
                    role:"超管",
                },
                {
                    email:"987654@qq.com",
                    name:"诸葛亮",
                    phone:"199999999",
                    address:"安徽合肥",
                    role:"超管",
                },
            ]
        })

        //初始化table配置项
        const initTableConfig = () => {
          let configData=props.config
          for(let key in configData){
              if( data.tableConfig[key]){
                   data.tableConfig[key] = configData[key]
              }
             
          }
        }
        onBeforeMount(()=>{
            initTableConfig();
        })

        return  {
            data,
        }
    }
}
</script>
<style lang="scss" scoped>

</style>