<template>
  <div class="main">
    <div id="albumname">
      <p>{{ albumname }}</p>
    </div>
    <div id="name" @click="klik">
      <p>{{ songFromFiles.name }}</p>
    </div>
    <div id="size">
      <p>{{ ((songFromFiles.size/1024)/1024).toString().substr(0, 4) + "MB"}}</p>
    </div>
    <div id="add">
      <i class="fas fa-plus-square fa-2x"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songs",
  props: ["songFromFiles", "albumname"],
  methods: {
    klik: function() {
      this.$emit("playSonga", this.songFromFiles.name);
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
#name {
  left: 30%;
  text-align: center;
  width: 40%;
}
#albumname {
  left: 0%;
  width: 30%;
  text-align: center;
}
#size {
  left: 70%;
  text-align: center;
  width: 10%;
}
#add {
  display: none;
  left: 80%;
  text-align: center;
  margin-top: 25px;
  width: 10%;
  color: magenta;
}
</style>
