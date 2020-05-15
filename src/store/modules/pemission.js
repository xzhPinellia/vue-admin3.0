import { getUserRole } from "@/api/login";
import {defaultRouterMap,asnycRouterMap} from "@/router"

function hasPremission(roles,router){
    if(router.meta && router.meta.role){
        return roles.some(item => router.meta.role.indexOf(item) >= 0)
    }
    console.log("roles",roles)
    console.log("router.meta.role",router.meta.role)
    //[11,22,33].includes('11')
    //[11,22,33].some(item => item=22)
    //["sale","technician","manager"] 用户角色
    //["sale"] 路由配置
}
const state = {
    allRouters:defaultRouterMap,
    addRouters:[]
}

const getters = {
    allRouters: state => state.allRouters,//所有的
    addRouters: state => state.addRouters,//匹配的
}

const mutations = {  // 必须的  同步 没有回调处理事情
   
   SET_ROUTER(state,router){
    state.addRouters=router
    state.allRouters=defaultRouterMap.concat(router)
   }
}

const actions = {  // 可以回调处理事情 
    //获取用户角色
    getRoles({commit}, repuestData) {
        return new Promise((resolve, reject) => {
            getUserRole(repuestData).then((response) => {
                let role=response.data.data
                // commit('SET_ROLES',role)//传出去
                resolve(role);//返回出去
            }).catch(error => {
                reject(error)
            })
        })
    },
    //创建动态路由
    createRouter({commit},data) {
        return new Promise((resolve, reject) => {
            //["infoStstem","userStstem"]
            let role=data;
            console.log(role)
            //超管
            let addRouters=[];
            if(role.includes("admin")){
                addRouters=asnycRouterMap
            }else{//普通管理
               addRouters= asnycRouterMap.filter(item =>{
                    if(hasPremission(role,item)){
                        console.log("1111",role)
                        //判断
                        if(item.children && item.children.length >0){
                            item.children=item.children.filter(child =>{
                                if(hasPremission(role,child)){
                                    return child;
                                }
                            })
                            return item;
                        }
                        return item;
                    }
                    
                })
            }
            
            //更新路由
            commit("SET_ROUTER",addRouters)
            console.log(addRouters)
            resolve();//告诉外面处理玩了
        })
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
