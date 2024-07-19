<script setup lang="ts">
import { toFixed } from '@grafikjs/core';
import { useEditor, useProject } from '../../store';
import { mdiRhombus } from '@mdi/js';

const editor = useEditor();
const project = useProject();
const props = defineProps<{
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	animatable?: boolean;
	property?: string;
}>();
const model = defineModel<number>({
	set: (value) => {
		return toFixed(value);
	},
	get(value) {
		if (props.property) {
			const ids = editor.activeLayerIds;
			if (ids.length === 1) {
				return project.byIds[ids[0]][props.property];
			} else {
				return '';
			}
		}
		return value;
	}
});
const update = (value) => {
	value = toFixed(value);
	model.value = value;
	if (props.property) {
		project.updateProps(
			editor.activeLayerIds.reduce((memo, id) => {
				memo[id] = {
					[props.property as string]: value
				};
				return memo;
			}, {})
		);
	}
};
const animate = () => {
	if (!props.animatable || !props.property) {
		return;
	}
	project.animate(editor.activeLayerIds[0], props.property, model.value, editor.time);
};
</script>

<template>
	<QField dense borderless :label="props.label" stack-label>
		<template v-slot:control>
			<QSlider
				v-model="model"
				dense
				label
				:min="min"
				:max="max"
				:step="step"
				@update:model-value="update"
			/>
		</template>
		<template v-slot:append>
			<QIcon
				v-if="props.animatable"
				:name="mdiRhombus"
				size="xs"
				@click="animate"
				class="cursor-pointer"
				title="Animate"
			/>
		</template>
	</QField>
</template>

<style scoped></style>
