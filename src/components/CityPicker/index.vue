<template>
   <div class="over-h">
        <el-row :gutter="10">
            <el-col :span="6" v-if="init.province"> 
                <el-select v-model="data.provinceValue" @change="handlerProvince">
                    <el-option
                        v-for="item in data.provinceData"
                        :key="item.PROVINCE_CODE"
                        :value="item.PROVINCE_CODE"
                        :label="item.PROVINCE_NAME"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.city">
                <el-select v-model="data.cityValue" @change="handlerCity">
                     <el-option
                        v-for="item in data.cityData"
                        :key="item.CITY_CODE"
                        :value="item.CITY_CODE"
                        :label="item.CITY_NAME"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.area">
                <el-select v-model="data.areaValue" @change="handlerArea">
                     <el-option
                        v-for="item in data.areaData"
                        :key="item.AREA_CODE"
                        :value="item.AREA_CODE"
                        :label="item.AREA_NAME"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-if="init.street">
               <el-select v-model="data.streetValue" @change="handlerStreet"> 
                     <el-option
                        v-for="item in data.streetData"
                        :key="item.STREET_CODE"
                        :value="item.STREET_CODE"
                        :label="item.STREET_NAME"
                    ></el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { watch, onBeforeMount, reactive} from '@vue/composition-api'; 
// import { GetCityPicker }  from '@/api/common'
import {cityPicker} from '@/mixins/cityPicker'
export default {
   name:'cityPicker',
   props:{
       cityPickerLevel:{
           type:Array,
           default:() =>[]
       },
       cityPickerData:{
           type:Object,
           default:() =>{}
       }
   },
    setup(props,{emit}) {
    //初始化省市区联动
    const init= reactive({
        province:false,
        city:false,
        area:false,
        street:false,
    })
    //组件方法
     const {
                data,resultData,getProvince, handlerProvince,handlerCity,handlerArea,handlerStreet
            }=cityPicker();
      //初始化
      const initCityPicker= ()=>{
          let initData=props.cityPickerLevel
          console.log(initData)
          if(initData.length==0){
              for(let key in init){
                  init[key]=true
              }
          }else{
              initData.forEach(item => {
                  init[item]=true
              });
          }
      }
       
       watch([
           ()=>resultData.provinceValue,
           ()=>resultData.cityValue,
           ()=>resultData.areaValue,
           ()=>resultData.streetValue
       ],([province,city,area,street])=>{
           emit('update:cityPickerData',resultData)
       })

       onBeforeMount(()=>{
           //初始化
           initCityPicker()
            //调用省
            getProvince()
       })
       

        return {
            data,
            init,
            handlerProvince,
            handlerCity,
            handlerArea,handlerStreet
        }
    }
}
</script>
<style lang="scss" scoped>

</style>