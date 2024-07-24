<script setup>
import {
	mdiChat,
	mdiEmoticonAngry,
	mdiEmoticonExcited,
	mdiEmoticonHappy,
	mdiEmoticonNeutral,
	mdiEmoticonSad,
	mdiHelpCircle,
	mdiShareVariant
} from '@mdi/js';
import { ref } from 'vue';
import axios from '../../../axios';

const rate = ref(0);
const message = ref('');
const loading = ref(false);
const send = () => {
	loading.value = true;
	console.log(rate.value);
	axios
		.post('feedback', {
			rate,
			message
		})
		.then((response) => {
			console.log(response);
			loading.value = false;
		})
		.catch((error) => {
			console.error(error);
			loading.value = false;
		});
};
</script>

<template>
	<QBtn :icon="mdiShareVariant" class="q-mx-xs" title="Share" round flat size="sm" />
	<QBtn :icon="mdiChat" class="q-mx-xs" title="Feedback" round flat size="sm">
		<QPopupProxy>
			<QCard>
				<QCardSection>
					<QRating
						:icon="[
							mdiEmoticonAngry,
							mdiEmoticonSad,
							mdiEmoticonNeutral,
							mdiEmoticonHappy,
							mdiEmoticonExcited
						]"
						class="full-width justify-between"
						size="md"
						v-model="rate"
					/>
				</QCardSection>
				<QCardSection>
					<QInput
						type="textarea"
						filled
						square
						cols="25"
						counter
						:maxlength="300"
						v-model="message"
					/>
				</QCardSection>
				<QCardActions>
					<QBtn
						size="sm"
						color="primary"
						:loading="loading"
						:disable="rate === 0"
						@click="send"
						>Send</QBtn
					>
				</QCardActions>
			</QCard>
		</QPopupProxy>
	</QBtn>
	<QBtn :icon="mdiHelpCircle" class="q-mx-xs" title="Help" round flat size="sm" />
</template>

<style scoped></style>
