<script setup>
import { useEditor } from '../../../store';

const editor = useEditor();
</script>

<template>
	<VRow class="content" no-gutters>
		<VCol class="settings"></VCol>
		<VCol class="tracks">
			<span class="time-line" :style="{ left: editor.playheadPosition }"></span>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.content {
	min-height: 48px;
}
.settings {
	width: 312px;
	flex-grow: 0;
	flex-basis: auto;
	border-right: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
.tracks {
	position: relative;
	width: calc(100% - 312px);
	flex-basis: auto;
	overflow: hidden;
	.time-line {
		position: absolute;
		display: inline-block;
		top: 0;
		left: 0;
		width: 2px;
		height: 100%;
		background-color: white;
		transform: translateX(-50%);
	}
}
</style>
