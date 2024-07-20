<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const filter = (key, value) => {
	router.push({
		query: {
			...router.currentRoute.value.query,
			[key]: value
		}
	});
};
</script>

<template>
	<div class="row justify-between items-center q-mb-md">
		<div class="col col-3 row">
			<QInput
				class="col"
				label="Search"
				debounce="800"
				:model-value="$route.query.search"
				@update:model-value="filter('search', $event)"
			></QInput>
			<QSelect
				class="col"
				label="Date"
				debounce="800"
				:model-value="$route.query.date"
				@update:model-value="filter"
			></QSelect>
		</div>
		<div>
			<QBtn class="q-mx-sm" color="primary" to="/">New Project</QBtn>
			<QBtn class="q-mx-sm">Upload</QBtn>
		</div>
	</div>
</template>

<style scoped></style>
