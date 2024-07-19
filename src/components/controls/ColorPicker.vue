<script setup lang="ts">
import { mdiRhombus, mdiSquare } from '@mdi/js';
import { ref } from 'vue';
import { useEditor, useProject } from '../../store';

const editor = useEditor();
const project = useProject();
const props = defineProps<{
	label: string;
	animatable?: boolean;
	property?: string;
}>();
const model = defineModel({
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
	project.addKf(editor.activeLayerIds[0], props.property, model.value, editor.time);
};
const type = ref('color');
</script>

<template>
	<QInput :label="props.label" v-model="model" dense stack-label @update:model-value="update">
		<template v-slot:prepend>
			<QBtn :style="{ color: model }" :icon="mdiSquare" square dense>
				<QPopupProxy self="center right">
					<QBtnToggle
						v-model="type"
						flat
						toggle-color="primary"
						size="sm"
						:options="[
							{
								label: 'None',
								value: 'none'
							},
							{
								label: 'Color',
								value: 'color'
							},
							{
								label: 'Gradient',
								value: 'gradient'
							}
						]"
					/>
					<QColor v-model="model" no-header @update:model-value="update" />
				</QPopupProxy>
			</QBtn>
		</template>
		<template v-slot:append>
			<QIcon
				v-if="props.animatable"
				:name="mdiRhombus"
				class="cursor-pointer"
				title="Animate"
				size="xs"
				@click="animate"
			/>
		</template>
	</QInput>
</template>

<style scoped></style>
