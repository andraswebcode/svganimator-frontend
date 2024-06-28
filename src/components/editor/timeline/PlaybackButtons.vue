<script setup>
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiInfinity,
	mdiPause,
	mdiPlay,
	mdiSkipNext,
	mdiSkipPrevious
} from '@mdi/js';
import { useEditor } from '../../../store';
const editor = useEditor();
const toggleTimeline = () => {
	if (editor.timelineHeight) {
		editor.timelineHeight = 0;
	} else {
		editor.timelineHeight = 300;
	}
	// Dispatch a resize event here to update canvas position.
	setTimeout(
		() => window.dispatchEvent(new Event('resize')),
		200 /** this is the css transition-duration */
	);
};
const goToStart = () => {
	editor.time = 0;
};
const goToEnd = () => {
	editor.time = editor.seconds;
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
			<VBtn :icon="mdiSkipPrevious" @click="goToStart" />
			<VBtn :icon="mdiPlay" />
			<VBtn :icon="mdiSkipNext" @click="goToEnd" />
			<VBtn :icon="mdiInfinity" />
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
