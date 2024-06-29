<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProject } from '../store';
const route = useRoute();
const project = useProject();

onMounted(() => {
	project.fetch(route.params.id);
});
</script>

<template>
	<TopBar />
	<OptionsMenu />
	<ToolBar />
	<LeftSideBar />
	<MainContent />
	<RightSideBar />
	<TimeLine />
</template>

<style scoped></style>
