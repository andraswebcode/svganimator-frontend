<script setup>
import { onMounted } from 'vue';
import { useDashboard } from '../store';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useProjectRequest } from '../hooks';

const { list } = useProjectRequest();
const route = useRoute();
const dashboard = useDashboard();

onMounted(() => {
	list(route.query, (state) => {
		dashboard.$patch(state);
	});
});
onBeforeRouteUpdate((to) => {
	list(to.query, (state) => {
		dashboard.$patch(state);
	});
});
</script>

<template>
	<AppBar />
	<DashboardSideBar />
	<DashboardContent />
</template>

<style scoped></style>
