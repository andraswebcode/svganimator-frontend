<script setup>
import { useRoute } from 'vue-router';
import UserMenu from './UserMenu.vue';
const route = useRoute();
const show = !route.meta.hideOnLoggedIn;
</script>

<template>
	<VAppBar>
		<VAppBarTitle>
			<RouterLink to="/">SVGAnimator</RouterLink>
		</VAppBarTitle>
		<template v-slot:append>
			<UserMenu v-if="show" />
		</template>
	</VAppBar>
</template>

<style scoped></style>
