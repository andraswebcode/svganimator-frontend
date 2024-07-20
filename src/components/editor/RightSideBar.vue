<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<QDrawer
		side="right"
		:width="256"
		:breakpoint="0"
		overlay
		elevated
		persistent
		v-model="editor.showRightSideBar"
	>
		<div class="q-pa-md">
			<PropertySettings v-if="editor.activeLayerIds.length" />
			<CanvasSettings v-else />
		</div>
		<QBtn
			class="close q-dark"
			:icon="mdiChevronRight"
			square
			dense
			size="sm"
			@click="editor.showRightSideBar = false"
		/>
		<FitZoom position="absolute" />
	</QDrawer>
	<QBtn
		class="open q-dark"
		:icon="mdiChevronLeft"
		square
		dense
		size="sm"
		@click="editor.showRightSideBar = true"
	/>
	<FitZoom position="fixed" />
</template>

<style scoped>
.open {
	position: fixed;
	top: 50px;
	right: 0px;
	z-index: 999;
}
.close {
	position: absolute;
	top: 0;
	left: -23px;
}
</style>
