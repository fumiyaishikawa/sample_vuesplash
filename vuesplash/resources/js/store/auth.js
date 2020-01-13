
const state = {
    user: null
}

const getters = {}

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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
