<script setup>
import { useEditor } from '../../store';
import PlaybackButtons from './timeline/PlaybackButtons.vue';
import TimelineHeader from './timeline/TimelineHeader.vue';
import TimelineContent from './timeline/TimelineContent.vue';
import TimelineFooter from './timeline/TimelineFooter.vue';
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
		editor.timelineHeight = Math.max(startHeight.value - delta, 0);
	}
};

const stopResize = () => {
	isResizing.value = false;
	document.removeEventListener('mousemove', resize);
	document.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
	document.addEventListener('mouseup', stopResize);
});

onBeforeMount(() => {
	document.removeEventListener('mouseup', stopResize);
});
</script>

<template>
	<footer
		class="timeline"
		:style="{
			height: editor.timelineHeight + 'px',
			transitionProperty: isResizing ? 'none' : 'height'
		}"
	>
		<div class="timeline__resize" @mousedown.prevent="startResize" />
		<PlaybackButtons />
		<TimelineHeader />
		<TimelineContent />
		<TimelineFooter />
	</footer>
</template>

<style scoped lang="scss">
@use './../../styles/settings';
.timeline {
	position: fixed;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: column;
	width: 100%;
	left: 0%;
	right: 0%;
	bottom: 0%;
	background-color: settings.$navigation-drawer-background;
	border-top: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
	transition-duration: settings.$navigation-drawer-transition-duration;
	transition-property: height;
	transition-timing-function: settings.$navigation-drawer-transition-timing-function;
	z-index: 1008;
	&__resize {
		position: absolute;
		width: 100%;
		height: 4px;
		top: -2px;
		right: 0%;
		left: 0%;
		cursor: ns-resize;
	}
}
</style>
