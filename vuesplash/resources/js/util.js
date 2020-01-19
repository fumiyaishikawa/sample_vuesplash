/**
 * クッキーの値を取得する, CSRF対策で使用する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */

export function getCookieValue(searchKey) {
    if (typeof searchKey === 'undefined') {
        return ''
    }

    let val = ''

    //document.cookieでクッキーから値の一覧を取得する。
    //ex) name = 12345; token = 67890; key = abcde => name, 12345, token, 67890, key, abcdeに分解する
    document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=')
        if (key === searchKey) {
            return val = value
        }
    })

    return val
}

// システムエラーのレスポンスコード
export const OK = 200
export const CREATED = 201
export const INTERNAL_SERVER_ERROR = 500
export const UNAUTHORIZED = 419
export const NOT_FOUND = 404

// バリデーションエラーのレスポンスコード
export const UNPROCESSABLE_ENTITY = 422
