<script setup lang="ts">
import { toFixed } from '@grafikjs/core';
import { mdiRhombus } from '@mdi/js';
import { useEditor, useProject } from '../../store';
import { computed } from 'vue';

const editor = useEditor();
const project = useProject();
const props = withDefaults(
	defineProps<{
		label: string;
		type?: 'text' | 'number';
		animatable?: boolean;
		property?: string;
	}>(),
	{
		type: 'number'
	}
);
const model = defineModel<string | number>({
	set: (value) => {
		if (props.type === 'number') {
			return toFixed(value);
		}
		return value;
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
const placeholder = computed(() =>
	!props.property || editor.activeLayerIds.length === 1 ? '' : 'Mixed'
);
const update = (value) => {
	if (props.type === 'number') {
		value = toFixed(value);
	}
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
	if (props.animatable && props.property) {
		project.addKf(editor.activeLayerIds[0], props.property, model.value, editor.time);
	}
};
</script>

<template>
	<QInput
		:type="props.type"
		dense
		stack-label
		:label="props.label"
		:placeholder="placeholder"
		:model-value="model"
		@update:model-value="update"
	>
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
	</QInput>
</template>

<style scoped></style>
