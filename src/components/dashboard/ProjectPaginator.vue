<script setup>
import { useRouter } from 'vue-router';
import { useDashboard } from '../../store';

const router = useRouter();
const dashboard = useDashboard();
const paginate = (page) => {
	router.push({
		query: {
			...router.currentRoute.value.query,
			page
		}
	});
};
</script>

<template>
	<div class="row justify-end q-mt-md">
		<QPagination
			v-if="dashboard.totalPages > 1"
			:model-value="parseInt($route.query.page || 1)"
			:max="dashboard.totalPages"
			:max-pages="6"
			direction-links
			@update:model-value="paginate"
		/>
	</div>
</template>

<style scoped></style>
