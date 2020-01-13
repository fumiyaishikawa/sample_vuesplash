<template>
  <nav class="navbar">
    <router-link class="navbar_brand" to="/">Vuesplash</router-link>
    <!-- ナビバーメニュー -->
    <div class="navbar__menu">
      <!-- 写真投稿ボタン -->
      <div v-if="isLogin" class="navbar__item">
        <button class="button">
          <i class="icon ion-md-add"></i>
          写真を投稿する
        </button>
      </div>
      <!-- ログイン状態で切り替え -->
      <span v-if="isLogin" class="navbar__item">ユーザーネーム：{{ username }}</span>
      <div v-else class="navbar__item">
        <router-link class="button button--link" to="/login">ログイン / 新規登録</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    // ログイン状態の確認
    isLogin() {
      return this.$store.getters["auth/check"];
    },
    // ログインユーザー名
    username() {
      return this.$store.getters["auth/username"];
    }
  }
};
</script>
