<script setup>
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<div class="row track">
		<div
			class="col second"
			v-for="sec in editor.secondList"
			:style="{ width: editor.secondWidth + 'px' }"
		>
			<span class="number">{{ sec }}</span>
			<div class="row notches">
				<div class="col notch" v-for="notch in editor.secondNotchList" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.track {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	flex-wrap: nowrap;
}
.second {
	flex-basis: auto;
}
.number {
	display: inline-block;
	height: 36px;
	padding: 2px 4px;
}
.notches {
	height: 12px;
	flex-wrap: nowrap;
}
.notch {
	flex-basis: auto;
}
.notch:not(:last-child) {
}
.notch:nth-child(5) {
	height: 24px;
	margin-top: -12px;
}
</style>
