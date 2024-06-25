<script setup>
import NotificationBar from './components/common/NotificationBar.vue';
</script>

<template>
	<VApp theme="dark">
		<RouterView />
		<NotificationBar />
	</VApp>
</template>

<style scoped></style>
