<script setup>
import { mdiAccount, mdiInformation, mdiInvoice } from '@mdi/js';
import { ref } from 'vue';

const tab = ref('profile');
</script>

<template>
	<AppBar />
	<QPageContainer>
		<QPage>
			<QTabs class="q-py-md" v-model="tab">
				<QTab name="profile" label="Profile" :icon="mdiAccount" />
				<QTab name="notification" label="Notification" :icon="mdiInformation" />
				<QTab name="subscription" label="Subscription" :icon="mdiInvoice" />
				<QTab name="support" label="Support" :icon="mdiInvoice" />
			</QTabs>
			<div class="row justify-center">
				<QTabPanels class="col-4 shadow-5" v-model="tab">
					<QTabPanel name="profile">
						<ProfilePanel />
					</QTabPanel>
					<QTabPanel name="notification">
						<NotificationPanel />
					</QTabPanel>
					<QTabPanel name="subscription">
						<SubscriptionPanel />
					</QTabPanel>
					<QTabPanel name="support">
						<SupportPanel />
					</QTabPanel>
				</QTabPanels>
			</div>
		</QPage>
	</QPageContainer>
</template>

<style scoped></style>
