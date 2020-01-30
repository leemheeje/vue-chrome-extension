<template>
  <div id="viewport">
    <div class="absolute">
      <div class="header" v-if="isAuth">
        <template v-if="$route.name == 'main' || $route.name == 'TheResult'">
          <span class="tit center">{{ $route.meta.pagename }}</span>
        </template>
        <template v-else>
          <div class="lt">
            <a href="javascript:;" class="fas fa-arrow-left" @click="locHistoryBack"></a>
          </div>
          <span class="tit">{{ $route.meta.pagename }}</span>
        </template>
        <div class="rt">
          <a href="javascript:;" class="fas fa-sign-out-alt" @click="fnUnAuth" title="로그아웃"></a>
        </div>
      </div>
      <div class="contents">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from 'vuex';
	export default {
		computed: {
			...mapState(['user_info', 'isAuth']),
		},
		methods: {
			...mapActions(['fnUnAuth']),
			...mapMutations(['fnTransDirection']),
			locHistoryBack() {
				this.$router.go(-1)
			}
		}
	};
</script>
<style scoped>
.animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
}
#viewport {
  width: 450px;
  height: 600px;
}
.header{position: absolute; left: 0; top: 0; height: 60px; width: 100%; text-align: center; padding-left: 60px; padding-right: 60px;}
.header .lt{position: absolute; left: 0; top: 0; width: 60px; height: 60px; line-height: 60px;}
.header .lt .fas{color: #555; font-size: 13px;}
.header .rt{position: absolute; right: 0; top: 0; width: 60px; height: 60px; line-height: 60px;}
.header .rt .fas{color: #555; font-size: 13px;}
.header .tit{font-size: 14px; font-weight: 700; line-height: 60px; display: block; text-align: left;}
.header .tit.center{text-align: center;}
.absolute{position: absolute; left: 5%; top: 5%; z-index: 10; width: 90%; height: 90%; display: table; background: none;}
.contents{display: table-cell; vertical-align: middle; background: rgba(255,255,255,1); border-radius: 20px; box-shadow: 0 0 30px rgba(0,0,0,0.05); padding: 0 15px;}
</style>
