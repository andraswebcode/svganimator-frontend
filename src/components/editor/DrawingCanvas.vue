<script setup>
import CanvasRuler from './canvas/CanvasRuler.vue';
</script>

<template>
	<VMain>
		<CanvasRuler direction="x" />
		<CanvasRuler direction="y" />
	</VMain>
</template>

<style scoped>
.v-main {
	position: relative;
}
</style>
