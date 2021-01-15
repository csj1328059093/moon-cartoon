import Vue from 'vue'
import Vuex from 'vuex'
import storageUtil from "../util/storageUtil";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collectBooks: storageUtil.read('collectBooks'),
        historyBooks: storageUtil.read('historyBooks'),
        localUser: storageUtil.read('localUser')
    },
    mutations: {
        addCollectBook(state, payload) {
            state.collectBooks.unshift(payload)
        },
        delCollectBook(state, payload) {
            state.collectBooks.splice(payload, 1)
        },
        addHistoryBook(state, payload) {
            state.historyBooks.unshift(payload)
        },
        delHistoryBook(state, payload) {
            state.historyBooks.splice(payload, 1)
        },
        popHistoryBook(state) {
            state.historyBooks.pop()
        },
        addUser(state, payload) {
            state.localUser = payload
        },
        changeCollectBook(state, payload) {
            state.collectBooks = payload
        },
        changeHistoryBook(state, payload) {
            state.historyBooks = payload
        },
    },
    actions: {},
    modules: {}
})
