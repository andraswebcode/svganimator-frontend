<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const open = ref(true);
</script>

<template>
	<QDrawer side="left" :width="256" :breakpoint="0" elevated v-model="open">
		<QBtn
			class="close q-dark"
			:icon="mdiChevronLeft"
			square
			dense
			size="sm"
			@click="open = false"
		/>
	</QDrawer>
	<QBtn class="open q-dark" :icon="mdiChevronRight" square dense size="sm" @click="open = true" />
</template>

<style scoped>
.open {
	position: fixed;
	top: 50px;
	left: 0px;
	z-index: 999;
}
.close {
	position: absolute;
	top: 0;
	right: -23px;
}
</style>
