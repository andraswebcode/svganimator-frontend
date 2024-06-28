<script setup>
import { Canvas, Interactive, ShapeTree, Wrapper, Selector, Defs } from '@grafikjs/vue';
import { useEditor, useProject } from '../../../store';
import { computed } from 'vue';
const project = useProject();
const editor = useEditor();
const height = computed(() => {
	const n = editor.timelineHeight;
	return `calc(100% - ${n}px)`;
});
</script>

<template>
	<Wrapper :style="{ height }">
		<Canvas :drawingWidth="project.width" :drawingHeight="project.height">
			<template v-slot:defs>
				<Defs />
			</template>
			<ShapeTree :json="project.structuredData" />
		</Canvas>
		<Interactive>
			<Selector />
		</Interactive>
	</Wrapper>
</template>

<style scoped>
.grafik-wrapper {
	width: 100%;
	height: 100%;
}
</style>
