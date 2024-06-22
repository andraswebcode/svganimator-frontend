<script setup>
import { useEditor } from '../../store';
import CanvasRuler from './canvas/CanvasRuler.vue';
import DrawingCanvas from './canvas/DrawingCanvas.vue';
const editor = useEditor();
</script>

<template>
	<VMain>
		<CanvasRuler v-if="editor.showRulers" direction="x" />
		<CanvasRuler v-if="editor.showRulers" direction="y" />
		<DrawingCanvas />
	</VMain>
</template>

<style scoped>
.v-main {
	position: relative;
}
</style>
