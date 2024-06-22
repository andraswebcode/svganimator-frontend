<script setup>
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<VRow class="track" no-gutters>
		<VCol
			class="second"
			v-for="sec in editor.secondList"
			:style="{ width: editor.secondWidth + 'px' }"
		>
			<span class="number">{{ sec }}</span>
			<VRow class="notches" no-gutters>
				<VCol class="notch" v-for="notch in editor.secondNotchList"></VCol>
			</VRow>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.track {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	flex-wrap: nowrap;
}
.second {
	flex-basis: auto;
	border-left: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
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
	border-right: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
.notch:nth-child(5) {
	height: 24px;
	margin-top: -12px;
}
</style>
