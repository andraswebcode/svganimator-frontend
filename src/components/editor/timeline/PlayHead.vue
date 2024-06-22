<script setup>
import { useEditor } from '../../../store';
const editor = useEditor();
</script>

<template>
	<div class="playhead" :style="{ left: editor.playheadPosition }" />
</template>

<style scoped>
.playhead {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 15px;
	height: 20px;
	background-color: aliceblue;
	cursor: ew-resize;
	transform: translateX(-50%);
	clip-path: polygon(0% 0%, 100% 0, 100% 50%, 50% 100%, 0 50%);
}
</style>
