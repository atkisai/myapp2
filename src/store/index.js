import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data:{},
      sdk:'',
      socket:'',
      sumbol:[],
  },
  mutations: {
      data(state, data){state.data=data},
      sdk(state, data){
          state.socket=new WebSocket('wss://stream.binance.com:9443/ws/'+data.toLowerCase()+'@depth')
          state.socket.addEventListener('message', function (event) {
            state.sdk=event.data;
          })
      },
      sumbol(state,sumbol){state.sumbol.push(sumbol)}
  },
  actions: {
  },
  modules: {
  }
})
