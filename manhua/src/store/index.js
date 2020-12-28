import Vue from 'vue'
import Vuex from 'vuex'
import storageUtil from "../util/storageUtil";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        collectBooks: storageUtil.read('collectBooks'),
        historyBooks: storageUtil.read('historyBooks'),
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
        }
    },
    actions: {},
    modules: {}
})
