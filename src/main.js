import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import "@/assets/scss/_variables.scss";
import "@/assets/scss/_animations.scss";
import '@/assets/scss/tailwind.scss';
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
    beforeCreate() {
        this.$store.commit('initialiseStore');
    }
}).$mount('#app');
