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
const updateShape = (props, shape) => {
	project.updateProps(shape.id, props);
};
const drawShape = (shape) => {
	project.addLayer(shape.toJSON());
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
			:penWidth="editor.penWidth"
			:penColor="editor.penColor"
			@change="canvasChanged"
		>
			<template v-slot:defs>
				<Defs />
			</template>
			<ShapeTree @select="selectShapes" @update="updateShape" @draw="drawShape" />
		</Canvas>
		<Interactive />
	</Wrapper>
</template>

<style scoped></style>
