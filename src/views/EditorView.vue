<script setup>
import { useRoute } from 'vue-router';
import EditorWrapper from '../components/editor/EditorWrapper.vue';
import PageLoader from '../components/common/PageLoader.vue';
import { useProject } from '../store';
import { onMounted } from 'vue';
const route = useRoute();
const project = useProject();

onMounted(() => {
	project.fetch(route.params.id);
});
</script>

<template>
	<EditorWrapper v-if="!project.loading" />
	<PageLoader v-if="project.loading" />
</template>

<style scoped></style>
