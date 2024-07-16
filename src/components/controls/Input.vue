<script setup lang="ts">
import { toFixed } from '@grafikjs/core';
import { mdiCardsDiamond } from '@mdi/js';

const props = withDefaults(
	defineProps<{
		label: string;
		type?: 'text' | 'number';
		animatable?: boolean;
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
	}
});
const emit = defineEmits(['animate']);
</script>

<template>
	<QInput :type="props.type" dense stack-label :label="props.label" v-model="model">
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
