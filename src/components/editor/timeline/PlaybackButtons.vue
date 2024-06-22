<script setup>
import { mdiChevronDown, mdiChevronUp, mdiPause, mdiPlay } from '@mdi/js';
import { useEditor } from '../../../store';
const editor = useEditor();
const toggleTimeline = () => {
	if (editor.timelineHeight) {
		editor.timelineHeight = 0;
	} else {
		editor.timelineHeight = 300;
	}
};
</script>

<template>
	<div class="playback">
		<VBtnGroup density="compact">
			<VBtn
				:icon="editor.timelineHeight ? mdiChevronDown : mdiChevronUp"
				@click="toggleTimeline"
			/>
		</VBtnGroup>
		<VChip density="compact" class="mx-2">{{ editor.formatTime }}</VChip>
		<VBtnGroup density="compact">
			<VBtn :icon="mdiPlay" />
		</VBtnGroup>
	</div>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.playback {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: settings.$button-height;
	padding: settings.$app-bar-density-default-padding;
	top: settings.$button-height * -1 - 4px;
	left: 50%;
	transform: translateX(-50%);
	background-color: settings.$bottom-navigation-background;
}
</style>
