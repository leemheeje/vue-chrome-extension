<template>
  <div class="container">
    <div class="row" style="display: block;" v-if="items.length">
      <div class="progWrap" style="margin: 0 -15px 0;">
        <TheResult
          v-for="(k, i) in items"
          :item="k"
          :count="i"
          :key="i"
          :compItemCount="compItemCount(k)"
          :compPercent="compPercent(k)"
          style="padding: 10px 15px; display: block;"
        >
          <div class="custom-control custom-radio" style="margin-top: 4px;">
            <input
              type="radio"
              :id="`customRadio${i}`"
              name="customRadio"
              v-model="checkbox"
              :value="k"
              class="custom-control-input"
              v-if="!inf_obj.ix_tph"
            />
            <input
              type="radio"
              :id="`customRadio${i}`"
              name="customRadio"
              class="custom-control-input"
              disabled
              :checked="k == inf_obj.ix_tph ? true : false"
              v-else
            />
            <label class="custom-control-label" :for="`customRadio${i}`">{{k}}</label>
          </div>
        </TheResult>
      </div>
      <a
        href="javascript:;"
        @click="locSubmit"
        class="btn btn-primary btn-block"
        v-if="!inf_obj.ix_tph"
      >투표하기</a>
      <div class="text-center txs" v-else>
		  <span class="bold">'{{inf_obj.ix_tph}}'</span> 에 투표하였습니다.
	</div>
    </div>
  </div>
</template>
<script>
	import { mapState, mapActions, mapMutations } from 'vuex';
	import TheResult from '../../../components/TheResult';
	export default {
		data() {
			return {
				docs: this.$options.filters.date_format(this.$current_date_live()),
				checkbox: '',
			};
		},
		computed: {
			...mapState(['user_info', 'inf_obj', 'items', 'items_count', 'items_total_count']),
			compItemCount() {
				return (nm) => {
					return this.items_count[nm] ? this.items_count[nm] : 0
				}
			},
			compPercent() {
				return (nm) => {
					return Math.round(this.items_count[nm] / this.items_total_count * 100)
				}
			}
		},
		created() {

			this.$firestore
				.collection(this.inf_obj.ix_con)
				.doc(this.docs)
				.get()
				.then(res => {
					if (res.exists) {
						let data = res.data();
						this.fnSetItems(data.array);
						this.fnSetItemCount(data.group_users);
						if (data.group_users[this.user_info.displayName]) {
							this.fnSetInfObject(data.group_users[this.user_info.displayName]);
						}
					}
				});
		},
		components: {
			TheResult,
		},
		methods: {
			...mapMutations(['fnSetItems', 'fnSetInfObject', 'fnSetItemCount']),
			locSubmit() {
				if (this.checkbox) {
					this.$firestore
						.collection(this.inf_obj.ix_con)
						.doc(this.docs)
						.get()
						.then(res => {
							console.log(res.data());
							if (res.exists) {
								let data = res.data()
								let key_obj = {
									group_users: {}
								}
								key_obj['group_users'][this.user_info.displayName] = this.inf_obj
								key_obj['group_users'][this.user_info.displayName]['ix_tph'] = this.checkbox
								this.$firestore
									.collection(this.inf_obj.ix_con)
									.doc(this.docs)
									.set({
										array: data.array,
										group_users: { ...data.group_users, ...key_obj.group_users }
									}).then(() => {
										this.$firestore
											.collection(this.inf_obj.ix_con)
											.doc(this.docs)
											.get()
											.then(response => {
												if (response.exists) {
													let resData = response
													alert('투표가 완료되었습니다.')
													location.reload()
													// this.fnSetInfObject({
													// 	ix_tph: this.checkbox
													// })
													//this.fnSetItemCount(resData.group_users)
												}
											})
									})
							}
						});
				}
			},
		},
	};
</script>
<style scoped>
.progress {
  margin-bottom: 10px;
}
.custom-control{display: inline-block; vertical-align: baseline;}
.progWrap{max-height: 400px; overflow-x: hidden; overflow-y: auto;}
.txs{font-size: 13px; color: #222; margin-top: 20px;;}
.bold{font-weight: bold; font-size: 20px}
</style>
