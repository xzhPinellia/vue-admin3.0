import { reactive,toRefs} from '@vue/composition-api'; 
import { GetCityPicker }  from '@/api/common'
export function cityPicker (){
    const  data = reactive({
        provinceValue:'',
        provinceData:[],
        cityValue:'',
        cityData:[],
        areaValue:'',
        areaData:[],
        streetValue:'',
        streetData:[],
    })

    const resultData= reactive({
        provinceValue:'',
        cityValue:'',
        areaValue:'',
        streetValue:'',
    })
    //获取省
    const getProvince =() =>{
        GetCityPicker({type:'province'}).then(res =>{
            data.provinceData=res.data.data.data
        }) 
    }
     //选择省 获取市
     const handlerProvince  =(val) =>{
        resetValue({type:'city'});
        GetCityPicker({type:'city',province_code:val}).then(res =>{
            data.cityData=res.data.data.data
        }) 
    }
     //选择市 获取区
     const handlerCity  =(val) =>{
        resetValue({type:'area'});
        GetCityPicker({type:'area',city_code:val}).then(res =>{
            data.areaData=res.data.data.data
        }) 
    }
     //选择区 获取街道
      const handlerArea  =(val) =>{
        resetValue({type:'street'});
        GetCityPicker({type:'street',area_code:val}).then(res =>{
            data.streetData=res.data.data.data
        }) 
    }
    //选择街道
    const handlerStreet  =(val) =>{
        resetValue({type:''});
    }
    //重置选项
    const  resetValue=(params)=>{
        const valueJson={
            city:['cityValue','areaValue','streetValue'],
            area:['areaValue','streetValue'],
            street:['streetValue']
        }
       const arrObj=valueJson[params.type]
    //清空key值
    if(arrObj){
        arrObj.forEach(item => {
            data[item]=''
       });
    }
       //数据集合处理
       result()
    }
    //返回数据集合
    const result  =(val) =>{
        for(let key in resultData){
            resultData[key]=data[key]
        }
    }
    return {
        data,resultData,
        // ...toRefs(data), //吧对象类型转化成基础类型
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea,
        resetValue,
        handlerStreet
    }
}