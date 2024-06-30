<script setup>
import { Canvas, Interactive, ShapeTree, Wrapper, Selector, Defs } from '@grafikjs/vue';
import { useEditor, useProject } from '../../../store';
const project = useProject();
const editor = useEditor();
</script>

<template>
	<Wrapper>
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

<style scoped></style>
