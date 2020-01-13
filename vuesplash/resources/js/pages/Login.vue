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
        <!-- エラーメッセージの表示 -->
        <div v-if="loginErrors" class="errors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- フォーム部分 -->
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
        <!-- エラーメッセージの表示 -->
        <div v-if="registerErrors" class="errors">
          <ul v-if="registerErrors.name">
            <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrors.email">
            <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrors.password">
            <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- フォーム部分 -->
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
import { mapState } from "vuex";

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
  computed: {
    ...mapState({
      // apiStatusの取得
      apiStatus: state => state.auth.apiStatus,
      // loginErrorMessageの取得
      loginErrors: state => state.auth.loginErrorMessages,
      // registerErrorMessagesの取得
      registerErrors: state => state.auth.registerErrorMessages
    })
  },
  methods: {
    // ログイン処理
    async login() {
      await this.$store.dispatch("auth/login", this.loginForm);
      // 通信状態が正常な場合、トップページに移動する
      if (this.apiStatus) {
        this.$router.push("/");
      }
    },
    //新規登録処理
    // 名前空間でauthストアのregisterアクションを呼び出す
    async register() {
      await this.$store.dispatch("auth/register", this.registerForm);
      if (this.apiStatus) {
        // トップページに移動する
        this.$router.push("/");
      }
    },
    clearError() {
      this.$store.commit("auth/setLoginErrorMessages", null);
      this.$store.commit("auth/setRegisterErrorMessages", null);
    }
  },
  created() {
    this.clearError();
  }
};
</script>
