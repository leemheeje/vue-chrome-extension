export const state = {
    isAuth: localStorage.getItem('access_token'),
    user_info: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
    },
    inf_obj: {
        ix_con: localStorage.getItem('inf_con'),
        ix_fdc: '',
        ix_tpd: '',
        ix_tph: '',
    },
	items: [],
	items_count : {},
	items_total_count : 0,
	transDirection:true
};