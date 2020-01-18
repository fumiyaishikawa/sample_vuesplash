<template>
  <div class="pagination">
    <router-link class="button" v-if="! isFirstPage" :to="`/?page=${currentPage - 1}`">&laquo; 前へ</router-link>
    <router-link class="button" v-if="! isLastPage" :to="`/?page=${currentPage + 1}`">次へ &raquo;</router-link>
  </div>
</template>

<script>
export default {
  props: {
    // 現在ページ
    currentPage: {
      type: Number,
      required: true
    },
    // 総ページ数
    lastPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.lastPage;
    }
  }
};
</script>

<style>
</style>
