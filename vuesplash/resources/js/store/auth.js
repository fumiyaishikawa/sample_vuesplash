import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

const state = {
    user: null,
    // API呼び出しが成功したかどうかを表す値
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null
}

const getters = {
    // ログインチェック。二重否定で確実に真偽値を返す
    check: state => !!state.user,
    // ユーザーがからの場合はusernameにから文字を返す
    username: state => state.user ? state.user.name : ''
}

const mutations = {
    // ユーザーセット
    setUser(state, user) {
        state.user = user
    },
    setApiStatus(state, status) {
        state.apiStatus = status
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages
    }
}

const actions = {
    // 新規登録API
    // async fn()= 非同期処理, axios.post=json形式で返す
    async register(context, data) { //passwordは六文字以上
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/register', data)

        if (response.status === CREATED) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setRegisterErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root: true })
        }
    },
    // ログインAPI
    async login(context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/login', data)

        // 通信結果の状態によりapiStatusを更新
        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)
        // ステータスコードがUNPROCESSABLE_ENTITYの場合に分岐させる
        if (response.status === UNPROCESSABLE_ENTITY) {
            // ルートコンポーネントに制御を渡さずにloginErrorMessagesにエラーメッセージを渡す
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            // 通信に失敗した場合の処理、別のモジュールへのmutationの場合は{ root: true }が必要
            context.commit('error/setCode', response.status, { root: true })
        }
    },
    // ログアウトAPI
    async logout(context) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/logout')

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', null)
            return false
        }

        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },
    // ログインしているユーザー情報を設定するAPI
    async currentUser(context) {
        context.commit('setApiStatus', null)
        const response = await axios.get('/api/user')
        const user = response.data || null

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', user)
            return false
        }

        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
