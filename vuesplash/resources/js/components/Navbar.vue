<template>
    <nav class="navbar">
        <router-link class="navbar_brand" to="/">Vuesplash</router-link>
        <div class="navbar__menu">
            <div class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    写真を投稿する
                </button>
            </div>
            <span class="navbar__item">ユーザー名</span>
            <div class="navbar__item">
                <router-link class="button button--link" to=/login>ログイン / 新規登録</router-link>
            </div>
        </div>
    </nav>
</template>
