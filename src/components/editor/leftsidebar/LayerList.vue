<script setup>
import { computed, ref } from 'vue';
import { useEditor, useProject } from '../../../store';
import {
	mdiArtboard,
	mdiCircleOutline,
	mdiClose,
	mdiFolderOpenOutline,
	mdiFolderOutline,
	mdiFormatText,
	mdiHeartOutline,
	mdiRectangleOutline,
	mdiStarOutline
} from '@mdi/js';

const project = useProject();
const editor = useEditor();
const iconMap = {
	g: mdiFolderOutline,
	rect: mdiRectangleOutline,
	circle: mdiCircleOutline,
	path: mdiHeartOutline,
	polygon: mdiStarOutline,
	text: mdiFormatText
};
const expanded = ref(['canvas']);
const items = computed(() => {
	const mapRecursve = ({ id, name, tagName, children }) => {
		let icon = iconMap[tagName];
		if (expanded.value.includes(id)) {
			icon = mdiFolderOpenOutline;
		}
		return {
			id,
			label: name || tagName,
			icon,
			selected: editor.activeLayerIds.includes(id),
			children: children?.map(mapRecursve)
		};
	};
	return [
		{
			id: 'canvas',
			label: 'Canvas',
			icon: mdiArtboard,
			children: project.structuredData.map(mapRecursve)
		}
	];
});
const filterRef = ref(null);
const filter = ref('');
const resetFilter = () => {
	filter.value = '';
	filterRef.value.focus();
};
</script>

<template>
	<QInput
		v-if="items[0].children.length > 0"
		ref="filterRef"
		dense
		v-model="filter"
		label="Filter"
	>
		<template #append>
			<QIcon
				v-if="filter !== ''"
				:name="mdiClose"
				class="cursor-pointer"
				@click="resetFilter"
			/>
		</template>
	</QInput>
	<QTree
		:nodes="items"
		:filter="filter"
		no-results-label="No matching layers found."
		node-key="id"
		v-model:expanded="expanded"
	>
		<template v-slot:default-header="prop">
			<QIcon
				:name="prop.node.icon"
				size="xs"
				class="q-mr-sm"
				:class="{ 'text-primary': prop.node.selected }"
				@click="editor.selectLayer(prop.node.id)"
			/>
			<div :class="{ 'text-primary': prop.node.selected }">{{ prop.node.label }}</div>
		</template></QTree
	>
</template>

<style scoped></style>
