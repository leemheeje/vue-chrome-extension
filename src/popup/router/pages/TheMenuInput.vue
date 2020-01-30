<template>
  <div>
    <div class="container">
      <div class="row">
        <input
          type="text"
          class="form-control"
          v-model="input"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder
          @keyup.enter="locNext"
        />
        <div class="noti">
          * 금일 메뉴를 정하시면 내일까지는 메뉴를 정할수없습니다.
          <br />* 메뉴 정하시면 1인 1회 투표하실수 있습니다.
        </div>
        <a
          href="javascript:;"
          @click="locNext"
          style="margin-top:10px;"
          class="btn btn-primary btn-block"
        >
          <span class="preloader" v-if="preloader">
            <i class="fas fa-spinner"></i>
          </span>
          <span v-else>확인</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
	import { mapMutations, mapState } from 'vuex';
	export default {
		data() {
			return {
				input: '',
				preloader : false
			};
		},
		computed: {
			...mapState(['user_info', 'inf_obj', 'items']),
		},
		methods: {
			...mapMutations(['fnSetInfObject']),
			locNext() {
				if (!this.input) {
					if (!confirm('아무거나 먹어도 상관없나요??')) {
						return;
					}
				}
				this.preloader = true
				this.fnSetInfObject({
					ix_fdc: this.input,
				});
				let docs = this.$options.filters.date_format(this.$current_date);
				this.$firestore
					.collection(this.inf_obj.ix_con)
					.doc(docs)
					.get()
					.then(async res => {
						let key_obj = {
							array: this.inf_obj.ix_fdc ? [this.inf_obj.ix_fdc] : [],
							group_users: {},
						};
						key_obj['group_users'][this.user_info.displayName] = this.inf_obj;
						key_obj['group_users'][this.user_info.displayName].ix_tpd = true;
						if (res.exists) {
							let data = res.data()

							if (data.array) {
								data.array = [...data.array, ...key_obj.array];
							}
							await this.$firestore
								.collection(this.inf_obj.ix_con)
								.doc(docs)
								.set({
									array: Array.from(new Set(data.array)),
									group_users: { ...data.group_users, ...key_obj.group_users },
								});
						} else {
							await this.$firestore
								.collection(this.inf_obj.ix_con)
								.doc(docs)
								.set(key_obj);
						}
						this.preloader = false
						this.$router.push({ name: 'TheResult' });
					});
			},
		},
	};
</script>
<style scoped>
.btn{position: relative; min-height: 38px;}
.preloader{background: transparent; left: 50%; margin-left: -20px;}
.preloader i{color: #fff;}
.noti{font-size: 13px; color: #222; margin: 10px 0 15px; text-align: left;}
</style>