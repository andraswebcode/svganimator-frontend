<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import PlayHead from './PlayHead.vue';
import TimeTrack from './TimeTrack.vue';
import { useEditor } from '../../../store';

const editor = useEditor();
const isMoving = ref(false);
const startX = ref(0);
const startTime = ref(0);

const startMove = (event) => {
	isMoving.value = true;
	startX.value = event.clientX;
	startTime.value = editor.time;
	document.addEventListener('mousemove', move);
	document.addEventListener('mouseup', stopMove);
};

const move = (event) => {
	if (isMoving) {
		const delta = (event.clientX - startX.value) / editor.secondWidth;
		editor.time = Math.max(delta + startTime.value, 0);
	}
};

const stopMove = () => {
	isMoving.value = false;
	document.removeEventListener('mousemove', move);
	document.removeEventListener('mouseup', stopMove);
};

onMounted(() => {
	document.addEventListener('mouseup', stopMove);
});

onBeforeUnmount(() => {
	document.removeEventListener('mouseup', stopMove);
});
</script>

<template>
	<VRow class="header" no-gutters align="stretch">
		<VCol class="settings"></VCol>
		<VCol class="timetrack" @mousedown.prevent="startMove">
			<TimeTrack />
			<PlayHead />
		</VCol>
	</VRow>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.header {
	height: 48px;
	min-height: 48px;
	flex-grow: 0;
	border-bottom: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
.settings {
	width: 312px;
	flex-grow: 0;
	flex-basis: auto;
}
.timetrack {
	position: relative;
	width: calc(100% - 312px);
	flex-basis: auto;
	overflow: hidden;
}
</style>
