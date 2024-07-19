<script setup>
import { ref } from 'vue';
import axios from '../axios';
import { useNotice } from '../hooks';
import { useUser } from '../store';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const userData = useUser();
const router = useRouter();
const notice = useNotice();
const register = () => {
	loading.value = true;
	axios
		.post('register', {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: passwordConfirm.value
		})
		.then(({ data }) => {
			console.log(data);
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			console.error(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'negative');
		});
};
const nameRules = [(value) => (value && value.length) || 'Please provide your name.'];
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const pwcRules = [
	(value) => (value && value === password.value) || 'The password confirmation does not match.'
];
</script>

<template>
	<AppBar />
	<FormContainer @submit="register">
		<template #title>Create an Account</template>
		<template #subtitle>
			Already have an account?
			<RouterLink to="/login">Login</RouterLink>
		</template>
		<template #form>
			<QInput
				label="Name"
				type="text"
				class="q-mb-sm"
				filled
				v-model="name"
				lazy-rules
				:rules="nameRules"
			/>
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
			<QInput
				label="Confirm Password"
				type="password"
				class="q-mb-sm"
				filled
				v-model="passwordConfirm"
				lazy-rules
				:rules="pwcRules"
			/>
		</template>
		<template #actions>
			<QBtn type="submit" :loading="loading" color="primary">Register</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
