<script setup lang="ts">
import { mdiRhombus } from '@mdi/js';
import { useEditor, useProject } from '../../../store';
import { computed, ref } from 'vue';
import { KeyframeEntity } from '../../../store/project';

const props = defineProps<{
	keyframe: KeyframeEntity;
}>();
const editor = useEditor();
const project = useProject();
const isDragging = ref(false);
const startX = ref(0);
const startTime = ref(0);
const color = computed(() =>
	editor.activeKeyframeIds.includes(props.keyframe.id) ? 'primary' : ''
);
const left = computed(() => (props.keyframe.to / 1000) * editor.secondWidth + 'px');
const title = computed(
	() =>
		`Value: ${props.keyframe.value} at Time: ${props.keyframe.to / 1000}s with ${
			props.keyframe.easing || 'linear'
		} easing.`
);
const dragStart = (event) => {
	const { to, id } = props.keyframe;
	isDragging.value = true;
	startX.value = event.clientX;
	startTime.value = to / 1000;
	editor.activeKeyframeIds = [id];
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', dragEnd);
};
const drag = (event) => {
	if (isDragging.value) {
		const delta = event.clientX - startX.value;
		const to = (startTime.value + delta / editor.secondWidth) * 1000;
		project.updateKf(editor.activeKeyframeIds[0], { to });
	}
};
const dragEnd = () => {
	isDragging.value = false;
	document.removeEventListener('mousemove', drag);
	document.removeEventListener('mouseup', dragEnd);
};
</script>

<template>
	<QIcon
		:name="mdiRhombus"
		class="keyframe absolute cursor-pointer"
		:color="color"
		:style="{ left }"
		:title="title"
		@mousedown="dragStart"
	/>
</template>

<style scoped>
.keyframe {
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
