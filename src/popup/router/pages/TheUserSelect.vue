<template>
  <div class="userSelect">
    <div class="container">
      <form>
        <div class="row">
          <select class="custom-select custom-select-lg mb-3" v-model="select">
            <option selected>R&D</option>
          </select>
          <a
            href="javascript:;"
            @click="locNext"
            class="btn btn-primary btn-block"
          >팀 선택하기</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
	import { mapMutations, mapState } from 'vuex';

	export default {
		data() {
			return {
				select: 'R&D',
			};
		},
		computed: {
			...mapState(['inf_obj']),
		},
		methods: {
			...mapMutations(['fnSetInfObject']),
			locNext() {
				if (!this.select) {
					alert('그룹을 선택해주세요.');
					return;
				}
				localStorage.setItem('inf_con', this.select);
				this.fnSetInfObject({
					ix_con: localStorage.getItem('inf_con'),
				});
				this.$router.push({ name: 'TheMenuInput' });
			},
		},
	};
</script>
