export default {
    save(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val))
    },
    read(key) {
        return JSON.parse(window.localStorage.getItem(key) || '[]')
    }
}