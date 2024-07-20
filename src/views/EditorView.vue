<script setup>
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useProjectRequest } from '../hooks';
import { useProject } from '../store';

const route = useRoute();
const project = useProject();
const { get } = useProjectRequest();

onMounted(() => {
	get(route.params.id, (state) => {
		if (state) {
			project.$patch(state);
		} else {
			project.$reset();
		}
		project.startHistory();
	});
});
onBeforeRouteUpdate((to, from) => {
	if (to.path !== '/' && from.path === '/') {
		return;
	}
	get(to.params.id, (state) => {
		if (state) {
			project.$patch(state);
		} else {
			project.$reset();
		}
		project.startHistory();
	});
});
</script>

<template>
	<TopBar />
	<ToolBar />
	<LeftSideBar />
	<MainContent />
	<RightSideBar />
	<TimeLine />
	<DialogList />
</template>

<style scoped></style>
