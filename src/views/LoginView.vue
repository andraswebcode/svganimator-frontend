<script setup>
import { inject, ref } from 'vue';
import AppBar from '../components/common/AppBar.vue';
import FormContainer from '../components/common/FormContainer.vue';
import { useUser } from '../store';
import { useRouter } from 'vue-router';
const axios = inject('axios');
const email = ref('');
const password = ref('');
const loading = ref(false);
const userData = useUser();
const router = useRouter();
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
			router.push('/');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
		});
};
</script>

<template>
	<AppBar />
	<FormContainer>
		<template v-slot:title>Login</template>
		<template v-slot:subtitle>
			New to SVGEditor?
			<RouterLink to="/register">Create an account</RouterLink>
		</template>
		<VTextField label="Email" type="email" required v-model="email" />
		<VTextField label="Password" type="password" required v-model="password" />
		<small class="d-block mb-2">
			<RouterLink to="/pwreset">Forgot your password?</RouterLink>
		</small>
		<template v-slot:actions>
			<VBtn @click="login" :loading="loading">Login</VBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
