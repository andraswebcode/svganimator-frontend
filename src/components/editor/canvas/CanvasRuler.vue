<script setup lang="ts">
const { direction } = defineProps<{
	direction: 'x' | 'y';
}>();
</script>

<template>
	<div class="ruler" :class="{ [`ruler-${direction}`]: direction }"></div>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.ruler {
	position: absolute;
	background-color: settings.$navigation-drawer-background;
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
