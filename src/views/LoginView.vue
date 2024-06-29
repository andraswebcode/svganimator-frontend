<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<template>
	<AppBar />
	<FormContainer>
		<template #title>
			<p class="text-h6">Login</p>
			<p class="text-subtitle">
				New to SVGEditor?
				<RouterLink to="/register">Create an account</RouterLink>
			</p>
		</template>
		<template #form>
			<QInput label="Email" type="email" v-model="email" />
			<QInput label="Password" type="password" v-model="password" />
		</template>
		<template #actions>
			<QBtn color="primary">Login</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
