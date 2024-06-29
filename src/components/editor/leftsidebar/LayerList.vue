<script setup>
import { computed, ref } from 'vue';
import { useProject } from '../../../store';
import {
	mdiArtboard,
	mdiCircleOutline,
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
</script>

<template>
	<QTree :nodes="items" node-key="id" v-model:expanded="expanded" />
</template>

<style scoped></style>
