<script setup>
import { Canvas, Interactive, ShapeTree, Wrapper, Selector, Defs } from '@grafikjs/vue';
import { useEditor, useProject } from '../../../store';
import { onMounted, onUnmounted } from 'vue';
const project = useProject();
const editor = useEditor();
const canvasChanged = (_props, canvas) => {
	const { zoom, panX, panY } = canvas;
	editor.$patch({
		zoom,
		panX,
		panY
	});
};
const selectShapes = (shapes) => {
	editor.activeLayerIds = shapes.map((shape) => shape?.id).filter((id) => !!id);
};
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
			@change="canvasChanged"
		>
			<template v-slot:defs>
				<Defs />
			</template>
			<ShapeTree @select="selectShapes" />
		</Canvas>
		<Interactive />
	</Wrapper>
</template>

<style scoped></style>
