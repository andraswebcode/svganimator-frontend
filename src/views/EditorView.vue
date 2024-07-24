<script setup>
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useProjectRequest } from '../hooks';
import { useEditor, useProject } from '../store';

const route = useRoute();
const project = useProject();
const editor = useEditor();
const { get } = useProjectRequest();

onMounted(() => {
	get(route.params.id, (state) => {
		editor.$reset();
		project.$reset();
		if (state) {
			project.$patch(state);
		}
		project.clearHistory();
		project.startHistory();
	});
});
onBeforeRouteUpdate((to, from) => {
	if (to.path !== '/' && from.path === '/') {
		return;
	}
	get(to.params.id, (state) => {
		editor.$reset();
		project.$reset();
		if (state) {
			project.$patch(state);
		}
		project.clearHistory();
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
