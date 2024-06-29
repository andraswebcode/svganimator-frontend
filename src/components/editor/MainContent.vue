<script setup>
import { useEditor } from '../../store';
const editor = useEditor();
</script>

<template>
	<QPageContainer>
		<QPage>
			<CanvasRuler v-if="editor.showRulers" direction="x" />
			<CanvasRuler v-if="editor.showRulers" direction="y" />
			<DrawingCanvas />
		</QPage>
	</QPageContainer>
</template>

<style scoped>
:deep(.q-page) {
	height: 1px;
	margin-left: 56px;
}
</style>
