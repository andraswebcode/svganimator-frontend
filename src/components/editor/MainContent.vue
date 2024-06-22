<script setup>
import CanvasRuler from './canvas/CanvasRuler.vue';
import DrawingCanvas from './canvas/DrawingCanvas.vue';
</script>

<template>
	<VMain>
		<CanvasRuler direction="x" />
		<CanvasRuler direction="y" />
		<DrawingCanvas />
	</VMain>
</template>

<style scoped>
.v-main {
	position: relative;
}
</style>
