<script setup>
import { ref } from 'vue';

const subject = ref('');
const message = ref('');
const loading = ref(false);
const send = () => {
	console.log(subject, message);
	loading.value = true;
};
</script>

<template>
	<p class="text-h6 q-ma-none q-mb-sm">Contact us</p>
	<p class="q-ma-none q-mb-sm">
		If you have any questions or issues regarding the app, please fill out the form below. We'll
		get back to you soon!
	</p>
	<QSeparator class="q-mb-sm" />
	<QForm @submit="send">
		<QInput label="Subject" class="q-mb-sm" square filled v-model="subject" />
		<QInput type="textarea" label="Message" square class="q-mb-sm" filled v-model="message" />
		<QSeparator class="q-mb-sm" />
		<QBtn type="submit" :loading="loading" square color="primary">Send</QBtn>
	</QForm>
</template>

<style scoped></style>
