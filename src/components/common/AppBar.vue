<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const show = !route.meta.hideOnLoggedIn;
</script>

<template>
	<QHeader class="q-dark" elevated>
		<QToolbar>
			<QToolbarTitle>
				<RouterLink to="/">SVGAnimator</RouterLink>
			</QToolbarTitle>
			<UserMenu v-if="show" />
		</QToolbar>
	</QHeader>
</template>

<style scoped></style>
