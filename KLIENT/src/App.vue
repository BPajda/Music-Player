<template>
  <div id="app">
    <div id="mainSong">
      <div id="albums">
        <albums
          v-for="album in getFirstFetch.albums"
          :key="album"
          :albumname="album"
          @zmianaAlbumu="zmianaAlbumu"
        ></albums>
      </div>
      <div id="songs" v-if="getListaStan == false">
        <div id="title">
          <h1>mp3 Player</h1>
        </div>
        <div id="trueSongs">
          <songs
            v-for="song in getFirstFetch.files"
            :key="song.name"
            :songFromFiles="song"
            :albumname="getNextAlbum"
            @playSonga="playSonga"
            @songToPlaylist="songToPlaylist"
          ></songs>
        </div>
      </div>
      <div id="songs" v-if="getListaStan == true">
        <div id="title">
          <h1>PlayList of mp3</h1>
        </div>
        <div id="trueSongs">
          <mysongs
            v-for="song in getPlayLista"
            :key="song.name"
            :songFromFiles="song"
            :albumname="song.album"
            @playSonga="playSonga"
          ></mysongs>
        </div>
      </div>
    </div>
    <div id="player">
      <player
        :albumik="getNextAlbum"
        :currSong="getCurrSong"
        :stan="getStan"
        @soundSound="soundSound"
        @songNext="songNext"
        @songPrev="songPrev"
        :timeMax="timeMax"
        :currentTime="currentTime"
        @moveAudio="moveAudio"
        @showPlaylist="showPlaylist"
      ></player>
    </div>
  </div>
</template>

<script>
import Player from "./components/Player.vue";
import Albums from "./components/Albums.vue";
import Songs from "./components/Songs.vue";
import Mysongs from "./components/Mysongs.vue";

export default {
  name: "App",
  components: {
    Player,
    Albums,
    Songs,
    Mysongs
  },
  created() {
    //po odpaleniu od razu sie wykonuje
    this.$store.dispatch("firstFetch");
  },
  computed: {
    //gettery
    getFirstFetch() {
      return this.$store.getters.getFirstFetch;
    },
    getNextAlbum() {
      return this.$store.getters.getNextAlbum;
    },
    getCurrSong() {
      return this.$store.getters.getCurrSong;
    },
    getStan() {
      return this.$store.getters.getStan;
    },
    getSongNum() {
      return this.$store.getters.getSongNum;
    },
    timeMax() {
      return this.$store.getters.timeMax;
    },
    currentTime() {
      return this.$store.getters.currentTime;
    },
    getListaStan() {
      return this.$store.getters.getListaStan;
    },
    getPlayLista() {
      return this.$store.getters.getPlayLista;
    }
  },
  methods: {
    //funkcje
    zmianaAlbumu: function(album) {
      this.$store.dispatch("nextFetch", album);
      this.$store.state.currentAlb = album;
      this.$store.state.currentSong = "";
      this.$store.state.listaStan = false;
    },
    playSonga: function(song) {
      this.$store.state.currentSong = song;
      document.getElementById("audio").load();
      document.getElementById("audio").onloadeddata = function(e) {
        this.$store.state.timeMax = Math.floor(e.target.duration);
      }.bind(this);
      document.getElementById("audio").ontimeupdate = function(e) {
        this.$store.state.currentTime = Math.floor(e.target.currentTime);
        document.getElementById("czasik").value = Math.floor(
          e.target.currentTime
        );
      }.bind(this);
      this.$store.state.stan = false;
      if (this.$store.state.currentSong.slice(0, 1) == 0) {
        this.$store.state.currSongNum = this.$store.state.currentSong.slice(
          1,
          2
        );
      } else {
        this.$store.state.currSongNum = this.$store.state.currentSong.slice(
          0,
          2
        );
      }

      this.soundSound();
    },
    soundSound: function() {
      if (this.$store.state.stan) {
        document.getElementById("audio").pause();
        this.$store.state.stan = !this.$store.state.stan;
      } else {
        document.getElementById("audio").play();
        this.$store.state.stan = !this.$store.state.stan;
      }
    },
    songNext: function() {
      if (
        this.$store.state.currSongNum < this.$store.state.daneServ.files.length
      ) {
        this.$store.state.currentSong = this.$store.state.daneServ.files[
          this.$store.state.currSongNum
        ].name;
        document.getElementById("audio").load();
        document.getElementById("audio").onloadeddata = function(e) {
          this.$store.state.timeMax = Math.floor(e.target.duration);
        }.bind(this);
        document.getElementById("audio").ontimeupdate = function(e) {
          this.$store.state.currentTime = Math.floor(e.target.currentTime);
          document.getElementById("czasik").value = Math.floor(
            e.target.currentTime
          );
        }.bind(this);

        this.$store.state.stan = false;
        if (this.$store.state.currentSong.slice(0, 1) == 0) {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            1,
            2
          );
        } else {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            0,
            2
          );
        }
        this.soundSound();
      } else {
        this.$store.state.currentSong = this.$store.state.daneServ.files[
          this.$store.state.currSongNum - 1
        ].name;
        document.getElementById("audio").load();
        document.getElementById("audio").onloadeddata = function(e) {
          this.$store.state.timeMax = Math.floor(e.target.duration);
        }.bind(this);
        document.getElementById("audio").ontimeupdate = function(e) {
          this.$store.state.currentTime = Math.floor(e.target.currentTime);
          document.getElementById("czasik").value = Math.floor(
            e.target.currentTime
          );
        }.bind(this);

        this.$store.state.stan = false;
        if (this.$store.state.currentSong.slice(0, 1) == 0) {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            1,
            2
          );
        } else {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            0,
            2
          );
        }
        this.soundSound();
      }
    },
    songPrev: function() {
      if (this.$store.state.currSongNum > 1) {
        this.$store.state.currentSong = this.$store.state.daneServ.files[
          this.$store.state.currSongNum - 2
        ].name;
        document.getElementById("audio").load();
        document.getElementById("audio").onloadeddata = function(e) {
          this.$store.state.timeMax = Math.floor(e.target.duration);
        }.bind(this);
        document.getElementById("audio").ontimeupdate = function(e) {
          this.$store.state.currentTime = Math.floor(e.target.currentTime);
          document.getElementById("czasik").value = Math.floor(
            e.target.currentTime
          );
        }.bind(this);

        this.$store.state.stan = false;
        if (this.$store.state.currentSong.slice(0, 1) > 0) {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            0,
            2
          );
        } else {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            1,
            2
          );
        }
        this.soundSound();
      } else {
        this.$store.state.currentSong = this.$store.state.daneServ.files[
          this.$store.state.currSongNum - 1
        ].name;
        document.getElementById("audio").load();
        document.getElementById("audio").onloadeddata = function(e) {
          this.$store.state.timeMax = Math.floor(e.target.duration);
        }.bind(this);
        document.getElementById("audio").ontimeupdate = function(e) {
          this.$store.state.currentTime = Math.floor(e.target.currentTime);
          document.getElementById("czasik").value = Math.floor(
            e.target.currentTime
          );
        }.bind(this);

        this.$store.state.stan = false;
        if (this.$store.state.currentSong.slice(0, 1) > 0) {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            0,
            2
          );
        } else {
          this.$store.state.currSongNum = this.$store.state.currentSong.slice(
            1,
            2
          );
        }
        this.soundSound();
      }
    },
    moveAudio: function() {
      var inp = document.getElementById("czasik").value;
      document.getElementById("audio").currentTime = inp;
    },
    songToPlaylist: function(songie) {
      this.$store.dispatch("addSong", songie);
    },
    showPlaylist: function() {
      this.$store.dispatch("showList");
      this.$store.state.listaStan = !this.$store.state.listaStan;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #2c3e50;
}
#mainSong {
  position: absolute;
  bottom: 200px;
  height: calc(100% - 200px);
  width: 100%;
  background-color: #2c3e50;
}
#albums {
  position: relative;
  width: 200px;
  height: 100%;

  overflow: scroll;
  overflow-x: hidden;
}
#songs {
  position: absolute;
  left: 200px;
  top: 0px;
  width: 100%;
  height: 100%;
}
#title {
  font-size: 40px;
  position: relative;
  height: 100px;
  top: 25px;
  width: 100%;
  text-align: center;
  color: blueviolet;
}
h1 {
  margin: 0px;
}
#trueSongs {
  position: relative;
  width: 100%;
  top: 25px;
  height: calc(100% - 125px);
  color: magenta;
  font-size: 30px;
  overflow: scroll;
  overflow-x: hidden;
}
#player {
  position: absolute;
  height: 200px;
  bottom: 0px;
  background-color: darkmagenta;
  width: 100%;
}
</style>
