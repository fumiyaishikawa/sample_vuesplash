import { getCookieValue } from './util'

window.axios = require('axios')

//Ajaxリクエストであることを示すヘッダーを付与する
//Ajaxリクエストであることを示すX-Request-Withヘッダーを付与することでLaravelはフォームではなく、ヘッダーを見てCSRFトークンチェックを行う
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.axios.interceptors.request.use(config => {
    // クッキーからトークンを取り出してヘッダーに添付する
    config.headers['X-XSRF-TOKEN'] = getCookieValue('XSRF-TOKEN')

    return config
})

// responseインターセプターはレスポンスを受けた後の処理を上書き
window.axios.interceptors.response.use(
    response => response,   //第一引数は成功時の処理
    error => error.response || error    //第二引数は失敗時の処理
)
