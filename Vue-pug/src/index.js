import 'normalize.css';
import './sass/index.scss';

import Vue from "vue";
import HeaderC from "./components/HeaderC";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    render: h => h(HeaderC)
});