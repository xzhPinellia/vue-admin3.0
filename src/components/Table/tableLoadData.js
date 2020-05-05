import { reactive } from "@vue/composition-api";
import {requestUrl} from '@/api/requestUrl'
import {loadTableData} from '@/api/common'
export function loadData(){

    const tableData= reactive({
        item:[],
        total:0
    })
     const tableLoadData = (parms)=>{
        let requestJson=parms
        let requestData={
            url:requestUrl[requestJson.url],
            method:requestJson.method,
            data:requestJson.data
        }
        loadTableData(requestData).then((res)=>{
            let resData=res.data.data.data
            //后台返回数据时，并不是一个数组，有时也会时null
            tableData.item=resData
            tableData.total=resData.length===0 ? 0 :res.data.data.total
        }).catch(error=>{

        })
     }

     return{
        tableData,tableLoadData
     }
}