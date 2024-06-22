<script setup>
import { ref } from 'vue';
import AppBar from '../components/common/AppBar.vue';
import FormContainer from '../components/common/FormContainer.vue';

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
		<template v-slot:title>Create an Account</template>
		<template v-slot:subtitle>
			Already have an account?
			<RouterLink to="/login"> Login </RouterLink>
		</template>
		<VTextField label="Name" required v-model="name" />
		<VTextField label="Email" type="email" required v-model="email" />
		<VTextField label="Password" type="password" required v-model="password" />
		<VTextField label="Confirm Password" type="password" required v-model="passwordConfirm" />
		<template v-slot:actions>
			<VBtn @click="register">Register</VBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
