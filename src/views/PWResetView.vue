<script setup>
import AppBar from '../components/common/AppBar.vue';
import FormContainer from '../components/common/FormContainer.vue';
</script>

<template>
	<AppBar />
	<FormContainer>
		<template v-slot:title>Forgot Your Password?</template>
		<template v-slot:subtitle>
			Enter your email, and we'll send a link to reset your password.
		</template>
		<VTextField label="Email" type="email" required />
		<small class="d-block mb-2">
			<RouterLink to="/login">&larr; Back to Login</RouterLink>
		</small>
		<template v-slot:actions>
			<VBtn>Send Email</VBtn>
		</template>
	</FormContainer>
</template>

<style scoped></style>
