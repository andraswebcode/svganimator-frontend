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
			router.push('/');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.message, 'negative');
		});
};
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
			<QInput label="Email" type="email" v-model="email" required />
			<QInput label="Password" type="password" v-model="password" required />
		</template>
		<template #actions>
			<QBtn type="submit" :loading="loading" color="primary">Login</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
