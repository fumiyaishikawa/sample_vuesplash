<template>
  <div class="photo">
    <figure class="photo__wrapper">
      <img :src="item.url" :alt="`Photo by ${item.owner.name}`" class="photo__image" />
    </figure>
    <!-- マウスオーバー時のオーバーレイ部分 -->
    <router-link
      class="photo__overlay"
      :to="`/photos/${item.id}`"
      :title="`View the photo by ${item.owner.name}`"
    >
      <div class="photo__controls">
        <!-- いいねボタン -->
        <button class="photo__action photo__action--like" title="Like photo">
          <i class="icon ion-md-heart"></i>12
        </button>
        <!--
            ダウンロードボタン
            このリンクは <RouterLink> ではなく <a> でなければいけません。
            Vue Router にハンドリングさせるのではなく、直接サーバーに GET リクエストを送信する必要があるからです。
        -->
        <a
          title="Download photo"
          @click.stop
          :href="`/photos/${item.id}/download`"
          class="photo__action"
        >
          <i class="icon ion-md-arrow-round-down"></i>
        </a>
      </div>
      <!-- 投稿者名 -->
      <div class="photo__username">{{ item.owner.name }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    //一つ分の写真のデータ
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
