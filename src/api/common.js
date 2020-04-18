import { GetCategory, GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "@/utils/request";
export function common(){
    const categoryItem = reactive({
        item: []
    });
    /**
     * 获取分类
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            categoryItem.item = response.data.data.data
        }).catch(error => {})
    }

    /**
     * 获取全部分类
     */
    const getInfoCategoryAll = () => {
        GetCategoryAll({}).then(response => {
            console.log(response)
            categoryItem.item = response.data.data
        }).catch(error => {})
    }
   
    

    return  {
        getInfoCategory,
        getInfoCategoryAll,
        categoryItem,
    }
}

  /**
     * 获取七牛云token
     */
    export function QiniuToken(data){
        return service.request({
            method: "post",
            url: "/uploadImgToken",
            data
        })
    }

     /**
     * 请求表格数数据
     */
    export function loadTableData(params){
        return service.request({
            method: params.method || "post",
            url: params.url,
            data:params.data || {}
        })
    }

      /**
     * 请求 省市区
     */
    export function GetCityPicker(data){
        return service.request({
            method: "post",
            url: "/cityPicker/",
            data
        })
    }