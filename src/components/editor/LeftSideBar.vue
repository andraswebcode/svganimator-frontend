<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const show = ref(true);
</script>

<template>
	<VNavigationDrawer tag="aside" v-model="show">
		<template v-slot:append>
			<SideBarToggler @click="show = !show" :icon="show ? mdiChevronLeft : mdiChevronRight" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped>
.sidebar-toggler {
	top: 0;
	left: calc(100% + 1px);
}
</style>
