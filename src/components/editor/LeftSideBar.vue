<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
	<QDrawer side="left" v-model="open">
		<QBtn class="close" :icon="mdiChevronLeft" square dense @click="open = false" />
	</QDrawer>
	<QBtn class="open" :icon="mdiChevronRight" square dense @click="open = true" />
</template>

<style scoped>
::v-deep .q-drawer {
	margin-left: 56px;
}
.open {
	position: fixed;
	top: 50px;
	left: 56px;
	z-index: 999;
}
.close {
	position: absolute;
	top: 0;
	right: -32px;
}
</style>
