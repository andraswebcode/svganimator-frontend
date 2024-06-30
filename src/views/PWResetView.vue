<script setup>
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
</script>

<template>
	<AppBar />
	<FormContainer>
		<template #title>Forgot Your Password?</template>
		<template #subtitle
			>Enter your email, and we'll send a link to reset your password.</template
		>
		<template #form>
			<QInput label="Email" type="email" v-model="email" required />
			<small>
				<RouterLink to="/login">&larr; Back to Login</RouterLink>
			</small>
		</template>
		<template #actions>
			<QBtn type="submit" :loading="loading" color="primary">Send Email</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
