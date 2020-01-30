<template>
  <div class="authWrap">
    <div class="container" v-if="!isAuth">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12 mx-auto">
          <div class="txts">
            <div class="tit">안녕하세요!</div>
            <div class="stit">투표를 위해선 로그인 해주세요.</div>
            <div class="subj">
              (현재는
              <span class="red bold">구글로그인만 가능</span>합니다.)
            </div>
          </div>
          <div class="form-signin">
            <button class="btns" type="submit" @click="locAuth">
              <span class="ico_google"></span>
              <span class="preloader" v-if="preloader">
                <i class="fas fa-spinner"></i>
              </span>
              <span class="txt">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-sm-12">
          <!-- Links -->
          <div class="step1">
            <router-link :to="{ name: 'TheUserSelect' }" class="teambtn">
              <div class="inner">
                <i class="fas fa-users"></i>
                <div class="txts">
                  <div class="tit">팀 선택하러가기</div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	export default {
		data(){
			return {
				preloader: false
			}
		},
		computed: {
			...mapState(['isAuth', 'user_info', 'inf_obj']),
		},
		created() {
			if (this.isAuth && this.inf_obj.ix_tpd) {
				this.$router.push({ name: 'TheResult' })
			}
		},
		methods: {
			...mapActions(['fnAuth', 'fnUnAuth']),
			locAuth() {
				this.preloader = true
				chrome.identity.getAuthToken({ interactive: true }, token => {
					
					this.fnAuth(token).then(() => {
						this.preloader = false
						if (this.isAuth && this.inf_obj.ix_tpd) {
							this.$router.push({ name: 'TheResult' })
						}
					})
				});
			},
		},
	};
</script>

<style scoped>
.txts{text-align: center;}
.txts .tit{font-size: 17px; color: #9797a8;}
.txts .stit{font-size: 19px; color: #222; display: block; padding: 3px 0 10px; font-weight: 700;}
.txts .subj{font-size: 13px; color: #9797a8;}
.red{text-decoration: underline;}
.ico_google{background: #fff url(/images/ico_google.png) no-repeat center center; background-size: 30px; display: inline-block; border-radius: 50%; width: 40px; height: 40px; position: absolute; left: 15px; top: 50%; transform: translateY(-50%);}
.bold{}
.btns{background: #4285f4; width: 100%; border-radius: 5px; box-shadow: 0 0 30px rgba(0,0,0,.1); font-size: 15px; text-align: center; line-height: 54px; display: block; outline: none; border: none; margin-top: 50px; color: #fff; font-weight: 700; position: relative; padding: 0 55px;}
.fab{width: 30px; line-height: 30px; background: #ff7eae; color: #fff; border-radius: 50%;}
.teambtn{text-align: center; width: 150px; height: 150px; border-radius: 50%; display: block; margin-left: auto; margin-right: auto; box-shadow: 0 0 30px rgba(0,0,0,0.05)}
.teambtn .inner{}
.teambtn .fas{font-size: 50px; color: #fff; border-radius: 50%; width: 150px; height: 150px; background: #fec96b; text-align: center; line-height: 150px; position: relative; overflow: hidden; }
.teambtn .fas:before{position: relative; z-index: 2;;}
.teambtn .fas:after{content: ''; width: 100%; height: 100%; position: absolute; left: 0; top: 0; background: url(http://www.freevectors.com/wp-content/uploads/2016/01/Vintage-Design-Pattern-Background-800x480.jpg) left top; background-size: auto 100%; mix-blend-mode :soft-light; z-index: 1;}

.teambtn .tit{font-size: 18px; color: #222; font-weight: bold; margin-top: 30px;}
</style>
