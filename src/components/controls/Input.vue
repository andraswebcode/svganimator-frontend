<script setup lang="ts">
import { toFixed } from '@grafikjs/core';
import { mdiCardsDiamond } from '@mdi/js';
import { computed } from 'vue';
import { useEditor, useProject } from '../../store';

const editor = useEditor();
const project = useProject();
const id = computed(() => {
	return editor.activeLayerIds[0];
});
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
const model = defineModel({
	set: (value) => {
		if (props.type === 'number') {
			return toFixed(value);
		}
		return value;
	},
	get(value) {
		if (props.property) {
			return project.byIds[id.value][props.property];
		}
		return value;
	}
});
const emit = defineEmits(['animate']);
const update = (value) => {
	if (props.type === 'number') {
		value = toFixed(value);
	}
	model.value = value;
	if (props.property) {
		project.updateProps(id.value, {
			[props.property]: value
		});
	}
};
</script>

<template>
	<QInput
		:type="props.type"
		dense
		stack-label
		:label="props.label"
		:model-value="model"
		@update:model-value="update"
	>
		<template v-slot:append>
			<QIcon
				v-if="props.animatable"
				:name="mdiCardsDiamond"
				size="xs"
				@click="emit('animate', model)"
				class="cursor-pointer"
				title="Animate"
			/>
		</template>
	</QInput>
</template>

<style scoped></style>
