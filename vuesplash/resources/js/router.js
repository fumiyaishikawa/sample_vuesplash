import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

// ページコンポーネントのインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'
import PhotoDetail from './pages/PhotoDetail.vue'
import NotFound from './pages/errors/NotFound.vue'

//VueRouterプラグインを使用する
//これによって、<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

//パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList,
        props: route => {
            const page = route.query.page
            return {
                page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1     //整数と解釈されない値は「1」と見なして返却
            }
        }
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
    },
    {
        path: '*',
        component: NotFound
    }
]

//VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {   //ページ遷移時にスクロール位置を先頭に固定
        return { x: 0, y: 0 }
    },
    routes
})

//VueRouterインスタンスをエクスポートする
//app.jsでインポートするため
export default router
