<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<QDrawer
		side="left"
		:width="256"
		:breakpoint="0"
		overlay
		elevated
		persistent
		v-model="editor.showLeftSideBar"
	>
		<div class="q-pa-md">
			<LayerList v-if="editor.tool === 'list'" />
			<ShapeLibrary v-else-if="editor.tool === 'shapes'" />
			<TextCreator v-else-if="editor.tool === 'text'" />
			<FileUploader v-else-if="editor.tool === 'uploads'" />
			<ImageLibrary v-else-if="editor.tool === 'images'" />
			<ProjectSettings v-else-if="editor.tool === 'settings'" />
		</div>
		<QBtn
			class="close q-dark"
			:icon="mdiChevronLeft"
			square
			dense
			size="sm"
			@click="editor.showLeftSideBar = false"
		/>
		<CanvasRuler v-if="editor.showRulers" direction="y" />
	</QDrawer>
	<QBtn
		class="open q-dark"
		:icon="mdiChevronRight"
		square
		dense
		size="sm"
		@click="editor.showLeftSideBar = true"
	/>
</template>

<style scoped>
:deep(.q-drawer) {
	margin-left: 56px;
}
.open {
	position: fixed;
	top: 50px;
	left: 56px;
	z-index: 999;
}
.close {
	position: absolute;
	top: 0;
	right: -23px;
}
.ruler {
	position: absolute;
	top: 0;
	right: -24px;
	z-index: -2;
}
</style>
