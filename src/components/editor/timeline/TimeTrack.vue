<script setup>
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<div class="row no-wrap track">
		<div
			class="col second"
			v-for="sec in editor.secondList"
			:style="{ width: editor.secondWidth + 'px' }"
		>
			<span class="number">{{ sec }}</span>
			<div class="row no-wrap notches">
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
}
.second {
	flex-basis: auto;
	border-left: solid 1px $editor-border-dark-color;
}
.number {
	display: inline-block;
	height: 28px;
	padding: 2px 4px;
}
.notches {
	height: 12px;
}
.notch {
	flex-basis: auto;
}
.notch:not(:last-child) {
	border-right: solid 1px $editor-border-dark-color;
}
.notch:nth-child(5) {
	height: 24px;
	margin-top: -12px;
}
</style>
