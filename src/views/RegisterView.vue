<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const register = () => {
	loading.value = true;
};
</script>

<template>
	<AppBar />
	<FormContainer>
		<template #title>Create an Account</template>
		<template #subtitle>
			Already have an account?
			<RouterLink to="/login">Login</RouterLink>
		</template>
		<template #form>
			<QInput label="Name" type="text" v-model="name" required />
			<QInput label="Email" type="email" v-model="email" required />
			<QInput label="Password" type="password" v-model="password" required />
			<QInput label="Confirm Password" type="password" v-model="passwordConfirm" required />
		</template>
		<template #actions>
			<QBtn type="submit" :loading="loading" color="primary">Register</QBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
