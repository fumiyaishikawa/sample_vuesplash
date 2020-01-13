import Vue from 'vue'
import Vuex from 'vuex'

//追加するモジュール
import auth from './auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth
    }
})

export default store
