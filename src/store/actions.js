import * as types from './mutation-types';
import router from '../popup/router';
import Vue from 'vue';

export const actions = {
	fnAuth: ({ commit, dispatch }, token) => {
		return new Promise(resolve => {
			var credential = Vue.prototype.$firebase.auth.GoogleAuthProvider.credential(null, token);
			Vue.prototype.$firebase
				.auth()
				.signInWithCredential(credential)
				.then(res => {
					let user = res.user;
					localStorage.setItem('access_token', token);
					dispatch('fnGetUserInfo', user);
					resolve();
				});
		})
	},
	fnGetUserInfo: ({ commit }, user) => {
		return new Promise(resolve => {
			commit('fnGetUserInfo', user);
			resolve(user)
		})
	},
	fnUnAuth: ({ state }) => {
		let token = localStorage.getItem('access_token');
		chrome.identity.removeCachedAuthToken({ token }, () => {
			localStorage.removeItem('access_token');
			state.isAuth = localStorage.getItem('access_token');
			router.push({ name: 'main' })
		});
	},
};