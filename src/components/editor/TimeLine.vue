<script setup>
import { useEditor } from '../../store';
import { clamp } from '../../utils/functions';
import { onBeforeMount, onMounted, ref } from 'vue';

const editor = useEditor();
const isResizing = ref(false);
const startY = ref(0);
const startHeight = ref(0);

const startResize = (event) => {
	isResizing.value = true;
	startY.value = event.clientY;
	startHeight.value = editor.timelineHeight;
	document.addEventListener('mousemove', resize);
	document.addEventListener('mouseup', stopResize);
};

const resize = (event) => {
	if (isResizing.value) {
		const delta = event.clientY - startY.value;
		const wHeight = window.innerHeight;
		editor.timelineHeight = clamp(startHeight.value - delta, 0, wHeight - 90);
		// Dispatch a resize event here to update canvas position.
		window.dispatchEvent(new Event('resize'));
	}
};

const stopResize = () => {
	isResizing.value = false;
	document.removeEventListener('mousemove', resize);
	document.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
	document.addEventListener('mouseup', stopResize);
	setTimeout(() => {
		// Dispatch a resize event here to update canvas position.
		window.dispatchEvent(new Event('resize'));
	}, 20);
});

onBeforeMount(() => {
	document.removeEventListener('mouseup', stopResize);
});
</script>

<template>
	<QFooter
		class="timeline q-dark column no-wrap"
		:style="{
			height: editor.timelineHeight + 'px',
			transitionProperty: isResizing ? 'none' : 'height'
		}"
		elevated
	>
		<div class="timeline__resize" @mousedown.prevent="startResize" />
		<PlaybackButtons />
		<TimelineHeader />
		<TimelineContent />
		<TimelineFooter />
	</QFooter>
</template>

<style scoped lang="scss">
.timeline {
	transition: height $generic-hover-transition;
	&__resize {
		position: absolute;
		width: 100%;
		height: 4px;
		top: -2px;
		right: 0%;
		left: 0%;
		cursor: ns-resize;
		z-index: 2;
	}
}
</style>
