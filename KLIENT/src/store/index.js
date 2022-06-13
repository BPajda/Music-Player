//store dla calej aplikacji!!!
import axios from "axios"
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

var state = {
    daneServ: {


    },
    danePlaylist: {


    },
    daneLista: {


    },
    currentAlb: "",
    currentSong: "",
    stan: false,
    currSongNum: 0,
    timeMax: 0,
    currentTime: 0,
    listaStan: false,
}
var getters = { //funkcja ktora tytlko zwraca (jedna linijka zazwyczaj)
    getFirstFetch: function (state) {
        return state.daneServ
    },
    getNextAlbum: function (state) {
        return state.currentAlb
    },
    getCurrSong: function (state) {
        return state.currentSong
    },
    getStan: function (state) {
        return state.stan
    },
    getSongNum: function (state) {
        return state.currSongNum
    },
    timeMax: function (state) {
        return state.timeMax
    },
    currentTime: function (state) {
        return state.currentTime
    },
    getListaStan: function (state) {
        return state.listaStan
    },
    getPlayLista: function (state) {
        return state.daneLista
    }


}
var mutations = { //funkcje obrabiajace dane dostane z serwera
    FDATA(state, newData) {
        state.daneServ = newData
        state.currentAlb = newData.albums[0]
    },
    NDATA(state, newData) {
        state.daneServ.files = newData
    },
    ADATA(state, newData) {
        state.danePlaylist = newData
    },
    PDATA(state, newData) {
        state.daneLista = newData
    }

}
var actions = { // funkcje dostane przez dispatch z aplikacji
    firstFetch({ commit }) {
        axios.post('http://localhost:3000/spotify', JSON.stringify({ info: "FIRST" }))
            .then(response => {
                commit('FDATA', response.data) //wykonanie mutacji (mutations)
            })
    },
    nextFetch({ commit }, album) {
        axios.post('http://localhost:3000/spotify', JSON.stringify({ info: "NEXT", album: album }))
            .then(response => {
                commit('NDATA', response.data) //wykonanie mutacji (mutations)
            })
    },
    addSong({ commit }, albsong) {
        axios.post('http://localhost:3000/spotify', JSON.stringify({ info: "ADDSONG", album: albsong.album, name: albsong.name, size: albsong.size }))
            .then(response => {
                commit('ADATA', response.data) //wykonanie mutacji (mutations)
            })
    },
    showList({ commit }) {
        axios.post('http://localhost:3000/spotify', JSON.stringify({ info: "SHOWLIST" }))
            .then(response => {
                commit('PDATA', response.data) //wykonanie mutacji (mutations)
            })
    },


}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})