<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';
import LayerTree from './leftsidebar/LayerTree.vue';
import { useEditor } from '../../store';

const show = ref(true);
const editor = useEditor();
const items = {
	list: LayerTree
};
const onClick = () => {
	show.value = !show.value;
	// setTimeout(() => window.dispatchEvent(new Event('resize')), 220);
};
</script>

<template>
	<VNavigationDrawer v-if="editor.activeTool" tag="aside" v-model="show">
		<template v-slot:append>
			<SideBarToggler @click="onClick" :icon="show ? mdiChevronLeft : mdiChevronRight" />
		</template>
		<component :is="items[editor.activeTool] || null" />
	</VNavigationDrawer>
</template>

<style scoped>
.sidebar-toggler {
	top: 0;
	left: calc(100% + 1px);
}
</style>
