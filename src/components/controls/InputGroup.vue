<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();
</script>

<template>
	<QField dense borderless :label="props.label" stack-label>
		<template v-slot:control>
			<div class="row no-wrap">
				<slot />
			</div>
		</template>
	</QField>
</template>

<style scoped></style>
