import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

// ページコンポーネントのインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'
import PhotoDetail from './pages/PhotoDetail.vue'

//VueRouterプラグインを使用する
//これによって、<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

//パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList
    },
    {
        path: '/photos/:id',    //写真IDを渡す
        component: PhotoDetail,
        props: true  //写真IDの値をpropsとして受け取る
    },
    {
        path: '/login',
        component: Login,
        // 定義されたルートにアクセスされてページコンポーネントが切り替わる直前に呼び出される関数
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next('/')   //擬似リダイレクト
            } else {
                next()     //コンポーネントの切り替え
            }
        }
    },
    {
        path: '/500',
        component: SystemError
    }
]

//VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history',
    routes
})

//VueRouterインスタンスをエクスポートする
//app.jsでインポートするため
export default router
