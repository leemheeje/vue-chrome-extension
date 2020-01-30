<template>
  <div :class="count % 2 == 0 ? '' : 'gray'">
    <div :class="`progress`">
      <div
        :class="`progress-bar progress-bar-striped align-middle ${progressColor}`"
        role="progressbar"
        :style="`width: ${compPercent}%`"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span class="lb" v-if="compPercent">{{`${compPercent}%`}}</span>
      </div>
    </div>
    <slot />
    <span class="count">({{compItemCount}}표)</span>
  </div>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		props: ['item', 'count', 'compItemCount', 'compPercent'],
		computed: {
			progressColor(){
				let clsnames = ['','bg-success','bg-info','bg-warning','bg-danger']
				return clsnames[this.count%clsnames.length];
			}
		}
	};
</script>
<style scoped>
.progress-bar{position: relative;}
.lb{position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #fff; font-weight: bold; font-size: 12px;}
.custom-control-input:disabled~.custom-control-label, .custom-control-input[disabled]~.custom-control-label{font-size: 12px; font-weight: normal; color: #222; padding-top: 3px;}
.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color: #168cff; border-color: #168cff;}
.count{vertical-align: baseline; display: inline-block; font-size: 12px; color: #222; margin-left: 5px;}
.gray{background: #fafafa;}
</style>
