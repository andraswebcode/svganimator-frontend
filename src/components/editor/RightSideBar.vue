<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
	<QDrawer side="right" :width="256" :breakpoint="0" overlay elevated v-model="open">
		<QBtn class="close q-dark" :icon="mdiChevronRight" square dense @click="open = false" />
	</QDrawer>
	<QBtn class="open q-dark" :icon="mdiChevronLeft" square dense @click="open = true" />
</template>

<style scoped>
.open {
	position: fixed;
	top: 50px;
	right: 0px;
	z-index: 999;
}
.close {
	position: absolute;
	top: 0;
	left: -32px;
}
</style>
