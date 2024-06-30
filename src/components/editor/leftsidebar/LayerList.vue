<script setup>
import { computed, ref } from 'vue';
import { useProject } from '../../../store';
import {
	mdiArtboard,
	mdiCircleOutline,
	mdiClose,
	mdiFormatText,
	mdiGroup,
	mdiHeartOutline,
	mdiRectangleOutline,
	mdiStarOutline
} from '@mdi/js';

const project = useProject();
const iconMap = {
	g: mdiGroup,
	rect: mdiRectangleOutline,
	circle: mdiCircleOutline,
	path: mdiHeartOutline,
	polygon: mdiStarOutline,
	text: mdiFormatText
};
const items = computed(() => {
	const mapRecursve = ({ id, name, tagName, children }) => ({
		id,
		label: name || tagName,
		icon: iconMap[tagName],
		handler: console.log,
		children: children?.map(mapRecursve)
	});
	return [
		{
			id: 'canvas',
			label: 'Canvas',
			icon: mdiArtboard,
			children: project.structuredData.map(mapRecursve)
		}
	];
});
const expanded = ref(['canvas']);
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
	/>
</template>

<style scoped></style>
