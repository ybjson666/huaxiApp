import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import wish from './wish';
import shop from './shop';
import volunteer from './volunteer'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        user,
        wish,
        shop,
        volunteer
    }
})