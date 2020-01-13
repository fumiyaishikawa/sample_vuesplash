
const state = {
    user: null
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
    }
}

const actions = {
    // 新規登録API
    // async fn()= 非同期処理, axios.post=json形式で返す
    async register(context, data) { //passwordは六文字以上
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    // ログインAPI
    async login(context, data) {
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },
    // ログアウトAPI
    async logout(context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    // ログインしているユーザー情報を設定するAPI
    async currentUser(context) {
        const response = await axios.get('/api/user')
        const user = response.data || null
        context.commit('setUser', user)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
