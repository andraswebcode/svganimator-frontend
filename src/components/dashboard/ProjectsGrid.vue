<script setup>
import { useDashboard } from '../../store';

const dashboard = useDashboard();
</script>

<template>
	<div class="row q-col-gutter-md">
		<ProjectItem v-for="item in dashboard.projects" v-bind="item" :key="item.id" />
	</div>
</template>

<style scoped></style>
