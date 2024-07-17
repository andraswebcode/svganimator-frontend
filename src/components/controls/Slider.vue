<script setup lang="ts">
const props = defineProps<{
	label?: string;
	min: number;
	max: number;
	step: number;
}>();
const model = defineModel<number>();
</script>

<template>
	<QField dense borderless :label="props.label" stack-label>
		<template v-slot:control>
			<QSlider v-model="model" dense label :min="min" :max="max" :step="step" />
		</template>
	</QField>
</template>

<style scoped></style>
