import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import '../assets/css/style.css';


firebase.initializeApp(firebaseConfig);
firebase.analytics();
const date = (p, c) => {
    let nd = !c ? new Date() : c;
    let cd = nd.getDate();
    let y = nd.getFullYear();
    let m = nd.getMonth() + 1;
    let d = cd < 10 ? `0${cd}` : cd;
    let h = nd.getHours() < 10 ? `0${nd.getHours()}` : nd.getHours();
    let min = nd.getMinutes() < 10 ? `0${nd.getMinutes()}` : nd.getMinutes();
    let s = nd.getSeconds() == 0 ? '00' : nd.getSeconds() < 10 ? `0${nd.getSeconds()}` : nd.getSeconds();
    if (p === 'full') {
        return `${y}${m}${d}${h}${min}${s}`;
    } else {
        return `${y}${m}${d}`;
    }
};
global.browser = require('webextension-polyfill');
Vue.prototype.$browser = global.browser;
Vue.prototype.$firebase = firebase;
Vue.prototype.$firestore = firebase.firestore();
Vue.prototype.$provider_google = new firebase.auth.GoogleAuthProvider();
Vue.prototype.$current_date_live = c => {
    return date('', c);
};
Vue.prototype.$current_date = Vue.prototype.$current_date_live()
Vue.filter('date_format', (s, format) => {
    //@params = ex > 20191104
    let regexp = /([0-9]{4})([0-9]{2})([0-9]{2})/i;
    let t = typeof s !== 'string' ? String(s) : s;

    let f = format;
    if (!f) {
        f = `$1-$2-$3`;
    }
    return t.replace(regexp, f);
});
/* eslint-disable no-new */
Vue.prototype.$firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        await store.dispatch('fnGetUserInfo', user).then(async res => {
            await Vue.prototype.$firestore.collection('R&D').doc(Vue.prototype.$current_date).get().then(response => {
                if (response.exists) {
                    let data = response.data()
                    store.commit('fnSetInfObject', data.group_users[res.displayName])
                    console.log(store.state);
                }
            })
        });
    }
    new Vue({
        el: '#app',
        store,
        router,
        render: h => h(App),
    });
});