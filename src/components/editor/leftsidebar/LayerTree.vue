<script setup>
import { computed } from 'vue';
import { useProject } from '../../../store';
import { mdiGroup } from '@mdi/js';

const project = useProject();
const items = computed(() => {
	const mapRecursve = ({ id, name, tagName, children }) => ({
		id,
		title: name || tagName,
		icon: mdiGroup,
		children: children?.map(mapRecursve)
	});
	return project.structuredData.map(mapRecursve);
});
</script>

<template>
	<VTreeview :items="items" activatable>
		<template v-slot:prepend="{ item, open }">
			<VIcon :icon="item.icon" />
		</template>
	</VTreeview>
</template>

<style scoped></style>
