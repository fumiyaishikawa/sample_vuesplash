const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.browserSync({    //自動的にブラウザをリロードする設定
   proxy: 'localhost', // アプリの起動アドレス, ここ間違っているかもしれない
   open: false // ブラウザを自動で開かない
})
   .js('resources/js/app.js', 'public/js')   //JSをコンパイルする設定
   .version()  //コンパイル時にキャッシュを読み込まないようにする。バージョニング。
