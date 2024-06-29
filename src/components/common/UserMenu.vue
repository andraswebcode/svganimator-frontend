<script setup>
import { mdiAccount, mdiAccountCog, mdiDraw, mdiLogin, mdiLogout, mdiViewDashboard } from '@mdi/js';
import { useUser } from '../../store';
const userData = useUser();
const logout = () => {
	userData.user = {};
	localStorage.clear('userData');
};
</script>

<template>
	<QBtn size="sm" round :icon="mdiAccount">
		<QMenu>
			<QList dense>
				<QItem v-if="userData.loggedIn"></QItem>
				<QSeparator />
				<QItem v-if="userData.loggedIn" to="/">
					<QItemSection>
						<QIcon :name="mdiDraw" />
					</QItemSection>
					<QItemSection>Editor</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" to="/dashboard">
					<QItemSection>
						<QIcon :name="mdiViewDashboard" />
					</QItemSection>
					<QItemSection>Dashboard</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" to="/account">
					<QItemSection>
						<QIcon :name="mdiAccountCog" />
					</QItemSection>
					<QItemSection>Account</QItemSection>
				</QItem>
				<QItem v-if="!userData.loggedIn" to="/login">
					<QItemSection>
						<QIcon :name="mdiLogin" />
					</QItemSection>
					<QItemSection>Login</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" clickable @click="logout">
					<QItemSection>
						<QIcon :name="mdiLogout" />
					</QItemSection>
					<QItemSection>Logout</QItemSection>
				</QItem>
			</QList>
		</QMenu>
	</QBtn>
</template>

<style scoped></style>
