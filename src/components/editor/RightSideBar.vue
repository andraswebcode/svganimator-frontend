<script setup>
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const show = ref(true);
const onClick = () => {
	show.value = !show.value;
	// setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
};
</script>

<template>
	<VNavigationDrawer tag="aside" location="end" v-model="show">
		<template v-slot:append>
			<SideBarToggler @click="onClick" :icon="show ? mdiChevronRight : mdiChevronLeft" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped>
.sidebar-toggler {
	top: 0;
	left: -29px;
}
</style>
