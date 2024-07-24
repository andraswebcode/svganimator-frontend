<script setup>
import { computed } from 'vue';
import { mdiRhombus } from '@mdi/js';
import { map } from 'lodash';
import { useEditor, useProject } from './../../../store';
import { SHAPE_ICON_MAP } from './../../../utils/constants';
import { useKeyframeSelector } from './../../../hooks';

const project = useProject();
const editor = useEditor();
const { containerRef, startSelect, style } = useKeyframeSelector();
const items = computed(() =>
	map(project.byIds, (layer) => {
		const { id, tagName, name, tracks } = layer;
		if (!tracks.length) {
			return;
		}
		const icon = SHAPE_ICON_MAP[tagName];
		return {
			id,
			label: name || tagName,
			icon,
			selected: editor.activeLayerIds.includes(id),
			tracks: tracks.map((prop) => id + '--' + prop)
		};
	}).filter((layer) => !!layer)
);
const playheadLeft = computed(
	() => editor.time * editor.secondWidth - editor.trackLeft + 311 + 'px'
);
const playheadDisplay = computed(() =>
	parseInt(playheadLeft.value) < 311 ? 'none' : 'inline-block'
);
</script>

<template>
	<div ref="containerRef" class="content col overflow-hidden" @mousedown.prevent="startSelect">
		<QList class="scroll">
			<QExpansionItem
				v-for="item of items"
				:key="item.id"
				class="full-width"
				dense
				dense-toggle
				switch-toggle-side
				expand-icon-toggle
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
				<QList dense>
					<KeyFrameTrack v-for="track of item.tracks" :key="track" :id="track" />
				</QList>
			</QExpansionItem>
		</QList>
		<div class="playhead" :style="{ display: playheadDisplay, left: playheadLeft }" />
		<div class="grafik-selector" :style="style"></div>
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
		width: 1px;
		height: 100%;
		background-color: $editor-border-dark-color;
		pointer-events: none;
	}
}
.q-list {
	height: 100%;
	.q-item {
		height: 20px;
		min-height: 20px;
		padding: 0;
		border-top: solid 1px $editor-border-dark-color;
		&:last-child {
			border-bottom: solid 1px $editor-border-dark-color;
		}
	}
}
:deep(.q-expansion-item__container > .q-item) {
	background-image: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.1),
		rgba(255, 255, 255, 0) 50%,
		rgba(0, 0, 0, 0.12) 51%,
		rgba(0, 0, 0, 0.04)
	) !important;
}
:deep(.q-item) {
	padding: 0;
}
</style>
