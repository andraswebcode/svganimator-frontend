<script setup>
import { mdiAccount, mdiAccountCog, mdiDraw, mdiLogin, mdiLogout, mdiViewDashboard } from '@mdi/js';
import { useUser } from '../../store';
import { useRouter } from 'vue-router';
const userData = useUser();
const router = useRouter();
const logout = () => {
	userData.user = {};
	localStorage.clear('userData');
	router.push('/login');
};
</script>

<template>
	<QBtn size="sm" round flat :icon="mdiAccount">
		<QMenu>
			<QList v-if="userData.loggedIn">
				<QItem>
					<QItemSection avatar>
						<QAvatar color="primary">U</QAvatar>
					</QItemSection>
					<QItemSection>
						<QItemLabel>{{ userData.user.name }}</QItemLabel>
						<QItemLabel>{{ userData.user.email }}</QItemLabel>
					</QItemSection>
				</QItem>
			</QList>
			<QList dense>
				<QSeparator />
				<QItem v-if="userData.loggedIn" to="/">
					<QItemSection side>
						<QIcon :name="mdiDraw" size="small" />
					</QItemSection>
					<QItemSection>Editor</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" to="/dashboard">
					<QItemSection side>
						<QIcon :name="mdiViewDashboard" size="small" />
					</QItemSection>
					<QItemSection>Dashboard</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" to="/account">
					<QItemSection side>
						<QIcon :name="mdiAccountCog" size="small" />
					</QItemSection>
					<QItemSection>Account</QItemSection>
				</QItem>
				<QItem v-if="!userData.loggedIn" to="/login">
					<QItemSection side>
						<QIcon :name="mdiLogin" size="small" />
					</QItemSection>
					<QItemSection>Login</QItemSection>
				</QItem>
				<QItem v-if="userData.loggedIn" clickable @click="logout">
					<QItemSection side>
						<QIcon :name="mdiLogout" size="small" />
					</QItemSection>
					<QItemSection>Logout</QItemSection>
				</QItem>
			</QList>
		</QMenu>
	</QBtn>
</template>

<style scoped></style>
