import * as types from './mutation-types';
import store from './index'
export const mutations = {
    fnGetUserInfo: (state, payload) => {
        state.isAuth = localStorage.getItem('access_token');
        state.user_info = {
            displayName: payload.displayName,
		};
    },
    fnSetInfObject: (state, payload) => {
        let v = state.inf_obj;
        state.inf_obj = {...v, ...payload };
    },
    fnSetItems: (state, payload) => {
		state.items = payload;
	},
	fnSetItemCount:(state,payload)=>{
		let v_array = []
		let v_obj = {}
		for (let k in payload) {
			if(payload.hasOwnProperty(k)){
				if(payload[k].ix_tph){
					v_array.push(payload[k].ix_tph)
					// v_obj[payload[k].ix_tph] = {
					// 	users : k,
					// 	count : 1
					// }
				}
			}
		}
		let u_array = Array.from(new Set(v_array));
		let total_count = 0
		for(let i = 0; i < u_array.length; i++){
			let count = 0
			v_array.map(nm => nm == u_array[i] ? count++ : 0)
			v_obj[u_array[i]] = count
			total_count +=  count
		}
		state.items_count = v_obj
		state.items_total_count = total_count

//state.items_count = 

	}
};