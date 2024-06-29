<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';
import { useEditor } from '../../store';

const open = ref(true);
const editor = useEditor();
</script>

<template>
	<QDrawer side="left" :width="256" :breakpoint="0" overlay elevated v-model="open">
		<LayerList />
		<QBtn class="close q-dark" :icon="mdiChevronLeft" square dense @click="open = false" />
		<CanvasRuler v-if="editor.showRulers" direction="y" />
	</QDrawer>
	<QBtn class="open q-dark" :icon="mdiChevronRight" square dense @click="open = true" />
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
	right: -32px;
}
.ruler {
	position: absolute;
	top: 0;
	right: -24px;
	z-index: -2;
}
</style>
