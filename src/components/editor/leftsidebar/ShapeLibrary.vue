<script setup>
import { useProject } from '../../../store';

const project = useProject();
</script>

<template>
	<button
		@click="
			project.addLayer({
				tagName: 'rect',
				width: 100,
				height: 100,
				left: 200,
				top: 200
			})
		"
	>
		Rectangle
	</button>
</template>

<style scoped></style>
