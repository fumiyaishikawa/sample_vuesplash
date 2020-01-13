import './bootstrap'

import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
//Vuexをインポート
import store from './store'
//ルートコンポーネントをインポートする
import App from './App.vue'

// currentUserをVueインスタンス生成後に呼び出すため、asyncメソッドの中にawaitを入れてcreateAppメソッドを作成
// Vueインスタンス生成後にcreateApp()を呼び出すことで非同期的にcurrentUserを呼び出す
const createApp = async () => {
    await store.dispatch('auth/currentUser')

    new Vue({
        el: '#app',
        router, // ルーティングの定義を読み込む
        store,
        components: { App }, // ルートコンポーネントの使用を宣言する
        template: '<App />' // ルートコンポーネントを描画する
    })
}

createApp()
