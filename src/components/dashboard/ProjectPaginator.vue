<script setup>
import { ref } from 'vue';

const current = ref(1);
</script>

<template>
	<div class="row justify-end q-mt-md">
		<QPagination v-model="current" :max="20" :max-pages="6" direction-links />
	</div>
</template>

<style scoped></style>
