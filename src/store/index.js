import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)


export default new vuex.Store({

    //数据仓库
    state: {
        username:"",
        userlist:[]
    },
    //同步获取数据
    mutations: {
        getUser(state,value){
            state.username = value;
            
        },
        getmes(state,value){
            state.userlist = value;
        }
    },
    //异步获取数据
    actions: {
            getUserList(ctx){
               return new Promise((resolve,res)=>{
                    axios.get("/api/userlist").then(mes=>{
                        ctx.commit("getmes",mes.data);
                        resolve();
                    })
                })
            }
    }

})


