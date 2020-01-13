<template>
  <div class="container-small">
    <!-- 切り替えタブ -->
    <ul class="tab">
      <li class="tab__item" :class="{ 'tab__item--active': tab === 1 }" @click="tab = 1">ログイン</li>
      <li class="tab__item" :class="{ 'tab__item--active': tab === 2 }" @click="tab = 2">新規登録</li>
    </ul>
    <!-- ログインフォーム -->
    <div class="panel" v-show="tab === 1">
      <form class="form" @submit.prevent="login">
        <label for="login-email">Eメールアドレス</label>
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email" />
        <label for="login-password">パスワード</label>
        <input type="passoword" class="form__item" id="login-password" v-model="loginForm.password" />
        <div class="form__button">
          <button class="button button--inverse" type="submit">ログイン</button>
        </div>
      </form>
    </div>
    <!-- 新規登録フォーム -->
    <div class="panel" v-show="tab === 2">
      <form class="form" @submit.prevent="register">
        <label for="username">ユーザー名</label>
        <input type="text" class="form__item" id="username" v-model="registerForm.name" />
        <label for="email">Eメールアドレス</label>
        <input type="text" class="form__item" id="email" v-model="registerForm.email" />
        <label for="password">パスワード</label>
        <input type="password" class="form__item" id="password" v-model="registerForm.password" />
        <label for="password-confirmation">パスワード確認</label>
        <input
          type="password"
          class="form__item"
          id="password-confirmation"
          v-model="registerForm.password_confirmation"
        />
        <div class="form__button">
          <button type="submit" class="button button--inverse">新規登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    // ログイン処理
    async login() {
      await this.$store.dispatch("auth/login", this.loginForm);
      // トップページに移動する
      this.$router.push("/");
    },
    //新規登録処理
    // 名前空間でauthストアのregisterアクションを呼び出す
    async register() {
      await this.$store.dispatch("auth/register", this.registerForm);
      // トップページに移動する
      this.$router.push("/");
    }
  }
};
</script>
