<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const show = ref(true);
</script>

<template>
	<VNavigationDrawer tag="aside" location="end" v-model="show">
		<template v-slot:append>
			<SideBarToggler @click="show = !show" :icon="show ? mdiChevronRight : mdiChevronLeft" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped>
.sidebar-toggler {
	top: 0;
	left: -29px;
}
</style>
