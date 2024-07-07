<script setup>
import { Canvas, Interactive, ShapeTree, Wrapper, Selector, Defs } from '@grafikjs/vue';
import { useEditor, useProject } from '../../../store';
import { onMounted, onUnmounted } from 'vue';
const project = useProject();
const editor = useEditor();
</script>

<template>
	<Wrapper>
		<Canvas
			:drawingWidth="project.width"
			:drawingHeight="project.height"
			:zoom="editor.zoom"
			:panX="editor.panX"
			:panY="editor.panY"
			:mode="editor.mode"
		>
			<template v-slot:defs>
				<Defs />
			</template>
			<ShapeTree :json="project.structuredData" />
		</Canvas>
		<Interactive />
	</Wrapper>
</template>

<style scoped></style>
