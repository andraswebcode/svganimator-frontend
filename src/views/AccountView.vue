<script setup>
import { mdiAccount, mdiInformation, mdiInvoice } from '@mdi/js';
import { ref } from 'vue';
const tab = ref('account');
</script>

<template>
	<AppBar />
	<QPageContainer>
		<QPage>
			<QTabs class="q-my-md" v-model="tab">
				<QTab name="account" label="Account" :icon="mdiAccount" />
				<QTab name="billing" label="Billing" :icon="mdiInformation" />
				<QTab name="invoices" label="Invoices" :icon="mdiInvoice" />
			</QTabs>
			<div class="row justify-center">
				<QTabPanels class="col-4 shadow-5" v-model="tab">
					<QTabPanel name="account"> Account </QTabPanel>
					<QTabPanel name="billing"> Billing </QTabPanel>
					<QTabPanel name="invoices"> Invoices </QTabPanel>
				</QTabPanels>
			</div>
		</QPage>
	</QPageContainer>
</template>

<style scoped></style>
