import store from '../../store';
import PageIndex from './pages/Index';
import TheUserSelect from './pages/TheUserSelect';
import TheMenuInput from './pages/TheMenuInput';
import TheResult from './pages/TheResult';
const beforeEnter = (to, from, next) => {
	if (store.state.isAuth && store.state.inf_obj.ix_tpd) { //이미 등록을 한사람
		next({
			name: 'TheResult'
		})
		return
	}
	next()
}
export default [{
	path: '/',
	name: 'main',
	component: PageIndex,
	meta: {
		title: 'Main',
		pagename: 'Main'
	},
	beforeEnter
},
{
	path: '/TheUserSelect',
	name: 'TheUserSelect',
	component: TheUserSelect,
	meta: {
		title: 'TheUserSelect',
		pagename: '팀을 선택해주세요'
	},
	beforeEnter
},
{
	path: '/TheMenuInput',
	name: 'TheMenuInput',
	component: TheMenuInput,
	meta: {
		title: 'TheMenuInput',
		pagename: '메뉴를 선정해주세요'
	},
	beforeEnter
},
{
	path: '/TheResult',
	name: 'TheResult',
	component: TheResult,
	meta: {
		title: 'TheResult',
		pagename: '결과확인'
	},
},
];