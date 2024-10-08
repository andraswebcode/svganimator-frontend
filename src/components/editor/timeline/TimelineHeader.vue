<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useEditor } from '../../../store';
import { clamp, toFixed } from '../../../utils/functions';

const editor = useEditor();
const isMoving = ref(false);
const wrapperLeft = ref(0);
const playheadLeft = computed(() => editor.time * editor.secondWidth - editor.trackLeft + 'px');

const startMove = (event) => {
	const { left } = event.currentTarget.getBoundingClientRect();
	isMoving.value = true;
	wrapperLeft.value = left;
	editor.time = toFixed(
		clamp((event.clientX - left + editor.trackLeft) / editor.secondWidth, 0, editor.seconds)
	);
	document.addEventListener('mousemove', move);
	document.addEventListener('mouseup', stopMove);
};

const move = (event) => {
	if (isMoving) {
		editor.time = toFixed(
			clamp(
				(event.clientX - wrapperLeft.value + editor.trackLeft) / editor.secondWidth,
				0,
				editor.seconds
			)
		);
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
	<div class="row header">
		<div class="col row justify-end items-center q-px-md settings">
			<TimelineSettings />
		</div>
		<div class="col timetrack relative-position" @mousedown.prevent="startMove">
			<TimeTrack />
			<div class="playhead absolute" :style="{ left: playheadLeft }" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.header {
	height: 40px;
	min-height: 40px;
	flex-grow: 0;
	border-bottom: solid 1px $editor-border-dark-color;
}
.settings {
	width: 312px !important;
	flex-grow: 0;
	flex-basis: auto;
	border-right: solid 1px $editor-border-dark-color;
}
.timetrack {
	width: calc(100% - 312px);
	flex-basis: auto;
	overflow: hidden;
	.playhead {
		bottom: 0;
		left: 0;
		width: 15px;
		height: 20px;
		background-color: aliceblue;
		cursor: ew-resize;
		transform: translateX(-50%);
		clip-path: polygon(0% 0%, 100% 0, 100% 50%, 50% 100%, 0 50%);
	}
}
</style>
