<script setup lang="ts">
import { mdiRhombus } from '@mdi/js';
import { toFixed } from '@grafikjs/core';
import { useEditor, useProject } from '../../../store';
import { computed, ref } from 'vue';

const props = defineProps<{
	id: string;
}>();
const editor = useEditor();
const project = useProject();
const isDragging = ref(false);
const startX = ref(0);
const startTimes = ref<{
	[kfId: string]: number;
}>({});
const kf = computed(() => project.kfe[props.id]);
const color = computed(() => (editor.activeKeyframeIds.includes(props.id) ? 'primary' : ''));
const left = computed(() => (kf.value.to / 1000) * editor.secondWidth + 'px');
const title = computed(() => {
	const v = kf.value.value;
	const t = toFixed(kf.value.to / 1000);
	const e = kf.value.easing || 'linear';
	return `Value: ${v} at Time: ${t}s with ${e} easing.`;
});
const dragStart = (event) => {
	const { id } = kf.value;
	isDragging.value = true;
	startX.value = event.clientX;
	startTimes.value = editor.activeKeyframeIds.reduce((memo, id) => {
		const { to } = project.kfe[id];
		memo[id] = to;
		return memo;
	}, {});

	if (!editor.activeKeyframeIds.length) {
		editor.activeKeyframeIds = [id];
	}

	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', dragEnd);
};
const drag = (event) => {
	if (isDragging.value) {
		const delta = event.clientX - startX.value;
		const changedKeyframes = editor.activeKeyframeIds.reduce((memo, id) => {
			const to = startTimes.value[id] + (delta / editor.secondWidth) * 1000;
			console.log(id, to, startTimes.value[id], delta);

			memo[id] = { to };
			return memo;
		}, {});

		project.updateKf(changedKeyframes);
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
		:data-keyframe="props.id"
		@mousedown="dragStart"
	/>
</template>

<style scoped>
.keyframe {
	top: 50%;
	transform: translate(-50%, -50%);
}
:deep(svg) {
	pointer-events: none;
}
</style>
