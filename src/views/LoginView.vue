<script setup>
import { ref } from 'vue';
import { useUser } from '../store';
import { useRouter } from 'vue-router';
import axios from '../axios';
import { useNotice } from '../hooks';

const email = ref('');
const password = ref('');
const loading = ref(false);
const userData = useUser();
const router = useRouter();
const notice = useNotice();
const login = () => {
	loading.value = true;
	axios
		.post('login', {
			email: email.value,
			password: password.value
		})
		.then(({ data }) => {
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'negative');
		});
};
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const pwRules = [(value) => (value && value.length) || 'Please enter your password.'];
</script>

<template>
	<AppBar />
	<FormContainer @submit="login">
		<template #title>Login</template>
		<template #subtitle>
			New to SVGEditor?
			<RouterLink to="/register">Create an account</RouterLink>
		</template>
		<template #form>
			<QInput
				label="Email"
				type="email"
				class="q-mb-sm"
				filled
				v-model="email"
				lazy-rules
				:rules="emailRules"
			/>
			<QInput
				label="Password"
				type="password"
				class="q-mb-sm"
				filled
				v-model="password"
				lazy-rules
				:rules="pwRules"
			/>
			<small>
				<RouterLink to="/pwreset">Forgot your password?</RouterLink>
			</small>
		</template>
		<template #actions>
			<QBtn type="submit" :loading="loading" color="primary">Login</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
