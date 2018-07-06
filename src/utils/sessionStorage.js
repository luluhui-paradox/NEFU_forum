const ss = sessionStorage;

export default {
  setItem(name, value) {
    ss.setItem(name, JSON.stringify(value))
  },
  getItem(name) {
    try {
      return JSON.parse(ss.getItem(name))
    } catch (e) {
      return null
    }
  },
  removeItem(name) {
    ss.removeItem(name)
  }
}
