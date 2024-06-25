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
</script>

<template>
	<VNavigationDrawer tag="aside" v-model="show">
		<template v-slot:append>
			<SideBarToggler @click="show = !show" :icon="show ? mdiChevronLeft : mdiChevronRight" />
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
