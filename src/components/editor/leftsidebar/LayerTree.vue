<script setup>
import { computed } from 'vue';
import { useProject } from '../../../store';

const project = useProject();
const tree = computed(() => {
	return project.ids.map((id) => ({
		id,
		title: '',
		icon: '',
		children: []
	}));
});
</script>

<template>
	<h1>Layers</h1>
</template>

<style scoped></style>
