<template>
  <div class="main">
    <img :src="`http://localhost:3000/spotify/${albumname}/cover.jpg`" @click="klik" />
  </div>
</template>

<script>
export default {
  name: "Albums",
  props: ["albumname"],
  methods: {
    klik: function() {
      this.$emit("zmianaAlbumu", this.albumname);
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
}
img {
  height: 100%;
  width: 100%;
}
</style>
