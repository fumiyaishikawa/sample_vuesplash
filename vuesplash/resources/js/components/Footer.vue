<template>
  <footer class="footer">
    <button v-if="isLogin" class="button button--link" @click="logout">ログアウト</button>
    <router-link v-else class="button button--link" to="/login">ログイン / 新規登録</router-link>
  </footer>
</template>


<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    }),
    ...mapGetters({
      // ログイン状態の確認
      isLogin: "auth/check"
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");

      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  }
};
</script>
