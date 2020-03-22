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
            if(resData && resData.length >0){
                tableData.item=resData
                tableData.total=res.data.data.total
            }
            
        }).catch(error=>{

        })
     }

     return{
        tableData,tableLoadData
     }
}