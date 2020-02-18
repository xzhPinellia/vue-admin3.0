<template>
    <div class="main">
        <div class="main-one">
            <div class="zxt">
                <el-card class="box-card">
                    <ve-line  :data="chartData" :settings="chartSettings"></ve-line>
                </el-card>
            </div>
            <div class="zzt">
                <el-card class="box-card">
                    <ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
                </el-card>
            </div>
        </div>
        
        <div class="main-two">
            <div class="bt">
                <el-card class="box-card">
                    <ve-pie :data="chartData3" ></ve-pie>
                </el-card>
            </div>
             <div class="sdt">
                <el-card class="box-card">
                    <ve-scatter :data="chartData4" ></ve-scatter>
                </el-card>
            </div>
        </div>
        
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
export default {
     setup(props, { root }) {
         //折线图
        const chartSettings =reactive({
            stack: { '用户': ['访问用户', '下单用户'] },
                area: true
        }) 
         const chartData=reactive({
            columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
        })
        //柱状图
         const chartSettings2 =reactive({
            axisSite: { right: ['下单率'] },
            yAxisType: ['KMB', 'percent'],
            yAxisName: ['数值', '比率']
        }) 
         const chartData2=reactive({
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
                { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
        })
        //饼图
        const chartData3=reactive({
            columns: ['日期', '访问用户'],
            rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
            ]
        })
        //散点图
        const chartData4=reactive({
            columns: ['日期', '访问用户', '下单用户', '年龄'],
            rows: [
                { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
                { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
                { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
                { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
                { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
                { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
            ]
        })
      return {
          chartData,chartSettings,
          chartData2,chartSettings2,
          chartData3,
          chartData4
        }
     }
}
</script>
<style lang="scss" scoped>
.main{
    width: 100%;
    .main-one{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .zxt,.zzt{
            width: 48%;
            height: 380px;
            .box-card{
                height: 100%;
            }
        }
    }
    .main-two{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .bt,.sdt{
            width: 48%;
             height: 380px;
              .box-card{
                height: 100%;
            }
        }
    }
   
}

</style>