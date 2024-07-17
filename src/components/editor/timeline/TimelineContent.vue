<script setup>
import { computed } from 'vue';
import { useEditor, useProject } from './../../../store';
import { SHAPE_ICON_MAP } from './../../../utils/constants';
const project = useProject();
const editor = useEditor();
const items = computed(() => {
	return project.animations.map(({ id, tracks }) => {
		const { tagName, name } = project.byIds[id];
		let icon = SHAPE_ICON_MAP[tagName];
		return {
			id,
			label: name || tagName,
			icon,
			selected: editor.activeLayerIds.includes(id),
			tracks
		};
	});
});
const playheadLeft = computed(() => editor.time * editor.secondWidth + 311 + 'px');
</script>

<template>
	<div class="content col">
		<QList class="scroll">
			<QExpansionItem
				v-for="item of items"
				class="full-width"
				dense
				dense-toggle
				switch-toggle-side
				expand-icon-toggle
				expand-separator
				default-opened
			>
				<template v-slot:header>
					<QItemSection side>
						<QIcon
							:name="item.icon"
							size="xs"
							:class="{ 'text-primary': item.selected }"
							@click.stop="editor.selectLayer(item.id)"
						/>
					</QItemSection>
					<QItemSection :class="{ 'text-primary': item.selected }">{{
						item.label
					}}</QItemSection>
				</template>
				<QList>
					<QItem v-for="track of item.tracks">
						<QItemSection class="leftside">{{ track.property }}</QItemSection>
						<QItemSection class="keyframes col-grow">{{ track }}</QItemSection>
					</QItem>
				</QList>
			</QExpansionItem>
		</QList>
		<div class="playhead" :style="{ left: playheadLeft }" />
	</div>
</template>

<style scoped lang="scss">
.content {
	position: relative;
	min-height: 32px !important;
	&:after,
	.playhead {
		content: '';
		position: absolute;
		display: inline-block;
		top: 0;
		left: 311px;
		width: 2px;
		height: 100%;
		background-color: $editor-border-dark-color;
		pointer-events: none;
	}
}
.leftside {
	width: 312px !important;
	flex: 0 0 auto;
}
.q-list {
	height: 100%;
}
:deep(.q-item) {
	padding: 0;
}
</style>
