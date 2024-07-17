<script setup>
import { computed, ref } from 'vue';
import { useProject } from './../../../store';
import { SHAPE_ICON_MAP } from './../../../utils/constants';
const project = useProject();
const expanded = ref([]);
const items = computed(() => {
	const mapRecursve = ({ id, tracks }) => {
		const { tagName, name } = project.byIds[id];
		let icon = SHAPE_ICON_MAP[tagName];
		return {
			id,
			label: name || tagName,
			icon,
			tracks
		};
	};
	return project.animations.map(mapRecursve);
});
</script>

<template>
	<div class="content col col-grow">
		<QTree
			:nodes="items"
			no-results-label="No animated layers found."
			node-key="id"
			v-model:expanded="expanded"
		>
			<template v-slot:default-header="prop">
				<QExpansionItem
					dense
					dense-toggle
					switch-toggle-side
					expand-separator
					default-opened
				>
					<template v-slot:header>
						<QItemSection side>
							<QIcon :name="prop.node.icon" size="xs" />
						</QItemSection>
						<QItemSection>{{ prop.node.label }}</QItemSection>
					</template>
					<QList>
						<QItem v-for="track of prop.node.tracks">
							<QItemSection>{{ track.property }}</QItemSection>
							<QItemSection>{{ track }}</QItemSection>
						</QItem>
					</QList>
				</QExpansionItem>
			</template>
		</QTree>
	</div>
</template>

<style scoped>
.content {
	min-height: 50px;
}
</style>
