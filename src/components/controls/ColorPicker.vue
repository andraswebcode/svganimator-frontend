<script setup lang="ts">
import { mdiCardsDiamond, mdiSquare } from '@mdi/js';
import { ref } from 'vue';

const model = defineModel();
const props = defineProps<{
	label: string;
	animatable: boolean;
}>();
const emit = defineEmits(['animate']);
const type = ref('color');
</script>

<template>
	<QInput :label="props.label" v-model="model" dense stack-label>
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
					<QColor v-model="model" no-header />
				</QPopupProxy>
			</QBtn>
		</template>
		<template v-slot:append>
			<QIcon
				v-if="props.animatable"
				:name="mdiCardsDiamond"
				class="cursor-pointer"
				title="Animate"
				size="xs"
				@click="emit('animate', model)"
			/>
		</template>
	</QInput>
</template>

<style scoped></style>
