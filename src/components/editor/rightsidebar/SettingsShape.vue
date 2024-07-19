<script setup>
import { computed } from 'vue';
import { useEditor, useProject } from '../../../store';

const editor = useEditor();
const project = useProject();
const tagName = computed(() => {
	const id = editor.activeLayerIds[0];
	return project.byIds[id]?.tagName;
});
</script>

<template>
	<InputGroup v-if="tagName === 'rect'" label="Size">
		<Input label="width" animatable property="width" />
		<Input label="height" animatable property="height" />
	</InputGroup>
	<Input v-else-if="tagName === 'circle'" label="radius" animatable property="r" />
</template>

<style scoped></style>
