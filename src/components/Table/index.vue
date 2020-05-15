<template>
 <div>
   <el-table :data='data.tableData' border style="width:100%" @selection-change="thatSelectCheckbox">
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
   <div class="table-footer">
       <el-row>
           <el-rol :span='4'>
                 <slot name='tableFooterLeft'></slot>
           </el-rol>
            <el-rol :span='20'>
               <el-pagination
                    class="pull-right"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageData.currentPage"
                    :page-sizes="pageData.pageSizes"
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageData.total">
                </el-pagination>
           </el-rol>
       </el-row>
   </div>
    
   </div>
</template>
<script>
import { reactive, ref, watch, onMounted, onBeforeMount } from '@vue/composition-api';
import { loadData} from './tableLoadData'
import { pagination} from './pagination'
export default {
    name: "tableVue",
    props:{
        config:{
            type:Object,
            default:()=>{}
        },
        tableRow:{
            type:Object,
            default:()=>{}
        },
    },
    setup(props, { root,emit}) {
       //加载数据
        const {tableData,tableLoadData} =loadData({ root});
        //分页
        const { pageData, handleSizeChange, handleCurrentChange,totalCount} =pagination({ root});
        const data=reactive({
            tableConfig:{
                selection:true,
                requestData:{},
                tHead:[]
            },
            tableData:[]
        })
        //vue3.0 业务逻辑拆分组合 
        // watch(()=>tableData.item,(newValue,oldValue) =>{data.tableData=newValue})
        //数据渲染
         watch([
             ()=>tableData.item,
             ()=>tableData.total
         ],([tableData,total]) =>{
             data.tableData=tableData
             totalCount(total)
         })
         //页码监听
         watch([
             ()=>pageData.currentPage,
             ()=>pageData.pageSize
         ],([currentPage,pageSize]) =>{
            let requestData=data.tableConfig.requestData
            if(requestData.data){
                requestData.data.pageNumber=currentPage
                requestData.data.pageSize=pageSize
                tableLoadData(data.tableConfig.requestData)
            }
         })
        // methods方法
        //初始化table配置项
        //匹配相同的key 如果存在 则替换
        const initTableConfig = () => {
          let configData=props.config
          let keys= Object.keys(data.tableConfig)
          for(let key in configData){
              if( keys.includes(key)){ // ["selection", "requestUrl", "tHead"].includes()
                   data.tableConfig[key] = configData[key]
              }
             
          }
        }
        //勾选checkbox 
        const thatSelectCheckbox  =(val) =>{
            console.log(props.tableRow)
            let rowData={
                idItem:val.map(item => item.id)
            }
            emit("update:tableRow",rowData)
        }
        //刷新数据
        const refreshData= ()=>{
            tableLoadData(data.tableConfig.requestData)
        }
        //参数刷新数据
        const paramsLoadData= (params)=>{
            let requestData=Object.assign({},params,{
                pageNumber:1,
                pageSize:10
            })
            data.tableConfig.requestData.data=requestData
            tableLoadData(data.tableConfig.requestData)
        }
        onBeforeMount(()=>{
            initTableConfig();
            tableLoadData(data.tableConfig.requestData)
        })

        return  {
            data,pageData, 
            totalCount,
            handleSizeChange, handleCurrentChange,thatSelectCheckbox,refreshData,paramsLoadData
        }
    }
}
</script>
<style lang="scss" scoped>
.table-footer{padding: 15px 0;}
</style>