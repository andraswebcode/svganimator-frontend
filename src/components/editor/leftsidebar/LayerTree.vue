<script setup>
import { useProject } from '../../../store';

const project = useProject();
</script>

<template>
	<h1>Layers</h1>
	{{ project.structuredData }}
</template>

<style scoped></style>
