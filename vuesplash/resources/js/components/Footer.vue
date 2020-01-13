<template>
  <footer class="footer">
    <button v-if="isLogin" class="button button--link" @click="logout">ログアウト</button>
    <router-link v-else class="button button--link" to="/login">ログイン / 新規登録</router-link>
  </footer>
</template>


<script>
export default {
  computed: {
    // ログイン状態の確認
    isLogin() {
      return this.$store.getters["auth/check"];
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>
