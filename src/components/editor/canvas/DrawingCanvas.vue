<script setup>
import { Canvas, ShapeTree } from '@grafikjs/vue';
</script>

<template>
	<Canvas :width="0" :height="0">
		<ShapeTree :json="[]" />
	</Canvas>
</template>

<style scoped></style>
