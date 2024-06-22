<script setup>
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<VRow class="track" no-gutters>
		<VCol v-for="sec in editor.secondList" :style="{ width: editor.secondWidth + 'px' }">
			<span>{{ sec }}</span>
			<VRow no-gutters>
				<VCol v-for="notch in editor.secondNotchList"></VCol>
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
}
.v-row {
	height: 100%;
	flex-wrap: nowrap;
}
.v-col {
	flex-basis: auto;
	border-left: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
</style>
