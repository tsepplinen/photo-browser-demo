<script>

import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import defaultErrorState from './defaultErrorState'

Vue.use(Vuex);

const state = Vue.util.extend({
  albums: {},
  albumPages: [],
  photoPages: [],
  photosLastPage: 1,
  albumListLastPage: 1,

}, {error: defaultErrorState});


export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

</script>