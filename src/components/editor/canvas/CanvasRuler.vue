<script setup lang="ts">
const { direction } = defineProps<{
	direction: 'x' | 'y';
}>();
</script>

<template>
	<div class="ruler q-dark" :class="{ [`ruler-${direction}`]: direction }"></div>
</template>

<style scoped lang="scss">
.ruler {
	position: absolute;
	z-index: 2;
	&-x {
		width: 100%;
		height: 24px;
	}
	&-y {
		width: 24px;
		height: 100%;
	}
}
</style>
