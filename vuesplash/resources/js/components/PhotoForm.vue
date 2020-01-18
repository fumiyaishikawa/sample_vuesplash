<template>
  <div v-show="value" class="photo-form">
    <h2 class="title">写真を投稿する</h2>
    <div v-show="loading" class="panel">
      <Loader>Sending your photo...</Loader>
    </div>
    <form v-show="! loading" class="form" @submit.prevent="submit">
      <!-- エラー文表示 -->
      <div class="errors" v-if="errors">
        <ul v-if="errors.photo">
          <li v-for="msg in errors.photo" :key="msg">{{ msg }}</li>
        </ul>
      </div>
      <!-- ファイルの選択エリア -->
      <input class="form__item" type="file" @change="onFileChange" />
      <output class="form__output" v-if="preview">
        <img :src="preview" alt />
      </output>
      <div class="form__button">
        <button class="button button--inverse" type="submit">送信</button>
      </div>
    </form>
  </div>
</template>

<script>
import { CREATED, UNPROCESSABLE_ENTITY } from "../util";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      preview: null,
      photo: null,
      errors: null
    };
  },
  methods: {
    //   フォームでファイルが選択されたら実行される
    onFileChange(event) {
      //何も選択されなかったら処理中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }

      //ファイルが画像ではなければ処理中断
      if (!event.target.files[0].type.match("image.*")) {
        this.reset();
        return false;
      }

      //FileReaderクラスのインスタンスを取得
      const reader = new FileReader();

      // ファイルを読み込み終わったタイミングで実行する処理
      reader.onload = e => {
        // previewに読み込み結果（データURL）を代入する
        // previewに値が入ると<output>につけたv-ifがtrueと判定される
        // また<output>内部の<img>のsrc属性はpreviewの値を参照しているので
        // 結果として画像が表示される
        this.preview = e.target.result;
      };

      //ファイルを読み込む
      //読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
      reader.readAsDataURL(event.target.files[0]);
      this.photo = event.target.files[0];
    },
    // 入力欄の値とプレビュー表示をクリアするメソッド
    // this.$elはコンポーネントそのもののDOM要素を指します
    // querySelectorはHTML内の要素を指定できる
    reset() {
      this.preview = "";
      this.photo = null;
      this.$el.querySelector('input[type="file"]').value = null;
    },
    async submit() {
      this.loading = true;

      const formData = new FormData();
      formData.append("photo", this.photo);
      const response = await axios.post("/api/photos", formData);

      this.loading = false;

      //バリデーションエラーの表示 this.rest()の前にfalseでメソッドを止める
      if (response.status === UNPROCESSABLE_ENTITY) {
        this.errors = response.data.errors;
        return false;
      }

      this.reset();
      /**
       * input イベントを発行して自動的にフォームを閉じる。
       * イベントとともに発行される値が false なので、<Navbar> の showForm が false になる。
       * <PhotoForm> に渡ってくる value も false になるので <PhotoForm> の v-show が偽と判定されて表示されなくなる
       */
      this.$emit("input", false);

      if (response.status !== CREATED) {
        this.$store.commit("error/setCode", response.status);
        return false;
      }

      // メッセージ登録
      this.$store.commit("message/setContent", {
        content: "写真が投稿されました！",
        timeout: 6000
      });

      this.$router.push(`/photos/${response.data.id}`).catch(err => {}); //Uncaught (in promise) NavigationDuplicatedエラー対処
    }
  }
};
</script>
