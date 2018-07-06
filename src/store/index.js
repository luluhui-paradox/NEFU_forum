import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import ss from '../utils/sessionStorage'
import router from '../router'
import * as moreActions from './actions'
import * as moreGetters from './getters'

Vue.use(Vuex)

const state = {
  user: ss.getItem('user'),
  auth: ss.getItem('auth'),
  articles: ls.getItem('articles'),
  access_token:ss.getItem('access_token'),
  searchValue: '',
  origin: location.origin
  // github pages
  // origin:location.origin.indexOf('github.io') !== -1 ? `${location.origin}/vuejs-essential/dist` : location.origin
}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
    ss.setItem('user', user)
  },
  UPDATE_AUTH(state, auth) {
    state.auth = auth;
    ss.setItem('auth', auth)
  },
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles;
    ls.setItem('articles', articles)
  },
  UPDATE_SEARCH_VALUE(state, searchValue) {
    state.searchValue = searchValue
  }
}

const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
      commit('UPDATE_AUTH', true)
      router.push('/')
  },
  logout({ commit }) {
    commit('UPDATE_AUTH', false)
    router.push({ name: 'Home', params: { logout: true } })
  },
  updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }

    commit('UPDATE_USER', user)
  },
    ...moreActions
}

const getters = {
  getArticleById: (state,getters) => (id) => {
   let articles = getters.computedArticles;

    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  },
   ...moreGetters
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

export default store
