<script setup lang="ts">
import { TrackObject } from '@grafikjs/core';
import { ref } from 'vue';
import { useEditor, useProject } from '../../../store';
import { mdiRhombus } from '@mdi/js';

const props = defineProps<{
	track: TrackObject;
}>();
const editor = useEditor();
const project = useProject();
const isDragging = ref(false);
const startX = ref(0);
const startTime = ref(0);
const dragStart = (event, kf) => {
	isDragging.value = true;
	startX.value = event.clientX;
	startTime.value = kf.to / 1000;
	editor.activeKeyframeIds = [kf.id];
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', dragEnd);
};
const drag = () => {
	if (isDragging.value) {
		const delta = event.clientX - startX.value;
		const time = (startTime.value + delta / editor.secondWidth) * 1000;
		project.updateKf(editor.activeKeyframeIds[0], { time });
	}
};
const dragEnd = () => {
	isDragging.value = false;
	document.removeEventListener('mousemove', drag);
	document.removeEventListener('mouseup', dragEnd);
};
</script>

<template>
	<div class="absolute full-height" :style="{ left: -editor.trackLeft + 'px' }">
		<QIcon
			v-for="kf in props.track.keyframes"
			:name="mdiRhombus"
			:color="editor.activeKeyframeIds.includes(kf.id) ? 'primary' : ''"
			class="keyframe absolute cursor-pointer"
			:style="{ left: (kf.to / 1000) * editor.secondWidth + 'px' }"
			:title="`Value: ${kf.value} at Time: ${kf.to / 1000}s with ${
				kf.easing || 'linear'
			} easing.`"
			@mousedown="dragStart($event, kf)"
		/>
	</div>
</template>

<style scoped lang="scss">
.keyframe {
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
