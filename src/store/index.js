import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import login from "./modules/login";
import common from "./modules/common";
import pemission from "./modules/pemission";
export default new Vuex.Store({
    modules: {
        app,
        login,
        common,
        pemission
    }
});
