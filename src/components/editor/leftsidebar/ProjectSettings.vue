<script setup>
import { useProject } from '../../../store';

const project = useProject();
</script>

<template>
	<Input type="text" label="Project Name" />
	<InputGroup>
		<Input label="Canvas Width" v-model="project.current.width" />
		<Input label="Canvas Height" v-model="project.current.height" />
	</InputGroup>
</template>

<style scoped></style>
