<script setup>
import { storeToRefs } from 'pinia';
import { useNotification } from './../../store';
const { show, message, type } = storeToRefs(useNotification());
</script>

<template>
	<VSnackbar v-model="show" :color="type" :timeout="5000" timer>
		{{ message }}
	</VSnackbar>
</template>

<style scoped></style>
