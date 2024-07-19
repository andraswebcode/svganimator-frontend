<script setup>
import { computed } from 'vue';
import { each } from 'lodash';
import { useEditor, useProject } from './../../../store';
import { SHAPE_ICON_MAP } from './../../../utils/constants';
import { mdiRhombus } from '@mdi/js';
const project = useProject();
const editor = useEditor();
const items = computed(() => {
	const animations = [];
	each(project.byIds, (layer, id) => {
		const { tagName, name, animation } = layer;
		if (!animation?.length) {
			return;
		}
		let icon = SHAPE_ICON_MAP[tagName];
		const tracks = {};
		each(animation, (id) => {
			const kf = project.kfe[id];
			if (!kf) {
				return;
			}
			if (!tracks[kf.property]) {
				tracks[kf.property] = {
					property: kf.property,
					keyframes: []
				};
			}
			tracks[kf.property].keyframes.push(kf);
		});
		animations.push({
			id,
			label: name || tagName,
			icon,
			selected: editor.activeLayerIds.includes(id),
			tracks
		});
	});
	return animations;
});
const ___items = computed(() => {
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
const playheadLeft = computed(
	() => editor.time * editor.secondWidth - editor.trackLeft + 311 + 'px'
);
const playheadDisplay = computed(() =>
	parseInt(playheadLeft.value) < 311 ? 'none' : 'inline-block'
);
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
					<QItem v-for="track of item.tracks">
						<QItemSection class="leftside">
							<div
								class="row justify-between items-center full-width q-pl-lg q-pr-sm"
							>
								<span>{{ track.property }}</span>
								<QIcon
									:name="mdiRhombus"
									class="cursor-pointer"
									title="Add Keyframe"
								/>
							</div>
						</QItemSection>
						<QItemSection
							class="keyframes relative-position q-px-none col-grow overflow-hidden"
						>
							<div
								class="absolute full-height"
								:style="{ left: -editor.trackLeft + 'px' }"
							>
								<KeyFrame v-for="kf of track.keyframes" :keyframe="kf" />
							</div>
						</QItemSection>
					</QItem>
				</QList>
			</QExpansionItem>
		</QList>
		<div class="playhead" :style="{ display: playheadDisplay, left: playheadLeft }" />
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
.leftside {
	width: 312px !important;
	flex: 0 0 auto;
}
.keyframes {
	margin: 0 !important;
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
:deep(.q-item) {
	padding: 0;
}
</style>
