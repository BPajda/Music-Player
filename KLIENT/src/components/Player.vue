<template>
  <div class="main">
    <div id="playList">
      <i class="fas fa-compact-disc fa-5x" @click="showPlaylist"></i>
    </div>
    <div id="songName">
      <p>{{currSong}}</p>
    </div>
    <div id="prev" @click="prev">
      <i class="fas fa-chevron-circle-left fa-9x"></i>
    </div>
    <div id="pause" v-if="stan" @click="pp">
      <i class="fas fa-pause-circle fa-9x"></i>
    </div>
    <div id="play" v-if="!stan" @click="pp">
      <i class="fas fa-play-circle fa-9x"></i>
    </div>
    <div id="next" @click="next">
      <i class="fas fa-chevron-circle-right fa-9x"></i>
    </div>
    <div id="czas" v-if="timeMax != 0">
      <p>{{(currentTime/60).toString().substr(0, 1)}}:{{currentTime%60}} / {{(timeMax/60).toString().substr(0, 1)}}:{{timeMax%60}}</p>
    </div>
    <div id="inpucik" v-if="timeMax != 0">
      <input
        type="range"
        name="czasik"
        id="czasik"
        min="0"
        :max="timeMax"
        @click="audioJump"
        value="0"
        step="1"
      />
    </div>
    <audio id="audio" controls>
      <source
        :src="`http://localhost:3000/spotify/${albumik}/${currSong}`"
        id="audio_src"
        type="audio/mp3"
      />
    </audio>
  </div>
</template>

<script>
export default {
  name: "Player",
  props: ["albumik", "currSong", "stan", "timeMax", "currentTime"],
  methods: {
    pp: function() {
      this.$emit("soundSound");
    },
    next: function() {
      this.$emit("songNext");
    },
    prev: function() {
      this.$emit("songPrev");
    },
    audioJump: function() {
      this.$emit("moveAudio");
    },
    showPlaylist: function() {
      this.$emit("showPlaylist");
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#playList {
  position: absolute;
  top: 0%;
  left: 0%;
  color: #2c3e50;
}
#songName {
  position: absolute;
  margin-top: 25px;
  text-align: center;
  color: #2c3e50;
  font-size: 40px;
  left: 5%;
  width: 450px;
}
#prev {
  height: 150px;
  margin-top: 25px;
  width: 150px;
  left: calc(50% - 150px);
  text-align: center;
  color: #2c3e50;
}
#pause {
  height: 150px;
  margin-top: 25px;
  width: 150px;
  left: 50%;
  text-align: center;
  color: #2c3e50;
}
#play {
  height: 150px;
  margin-top: 25px;
  width: 150px;
  left: 50%;
  text-align: center;
  color: #2c3e50;
}
#next {
  height: 150px;
  margin-top: 25px;
  width: 150px;
  left: calc(50% + 150px);
  text-align: center;
  color: #2c3e50;
}
#czas {
  position: absolute;
  height: 150px;
  margin-top: 50px;
  width: 300px;
  left: 75%;
  font-size: 50px;
  text-align: center;
}
#inpucik {
  position: absolute;
  height: 50px;
  top: 25px;
  width: 300px;
  left: 75%;
}
#czasik {
  width: 300px;
  height: 25px;
  -webkit-appearance: none;
  border-radius: 5px;
  background: blueviolet;
  outline: none;
}

#czasik::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #2c3e50;
  cursor: pointer;
}

#czasik::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #2c3e50;
  cursor: pointer;
}

#audio {
  display: none;
}
</style>
