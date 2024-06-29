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
		<QBtnGroup class="q-dark" rounded glossy>
			<QBtn
				size="sm"
				:icon="editor.timelineHeight ? mdiChevronDown : mdiChevronUp"
				@click="toggleTimeline"
			/>
			<QBtn size="sm" disable>
				<QChip>{{ editor.formatTime }}</QChip>
			</QBtn>
			<QBtn size="sm" :icon="mdiSkipPrevious" @click="goToStart" />
			<QBtn size="sm" :icon="mdiPlay" />
			<QBtn size="sm" :icon="mdiSkipNext" @click="goToEnd" />
			<QBtn size="sm" :icon="mdiInfinity" />
		</QBtnGroup>
	</div>
</template>

<style scoped lang="scss">
.playback {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: -50px;
	left: 50%;
	transform: translateX(-50%);
}
</style>
