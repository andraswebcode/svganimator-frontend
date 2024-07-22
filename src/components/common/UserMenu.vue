<script setup>
import { mdiAccount, mdiAccountCog, mdiDraw, mdiLogout, mdiViewDashboard } from '@mdi/js';
import { useUser } from '../../store';
import { useRouter } from 'vue-router';
import axios from '../../axios';
import { useLoader } from '../../hooks';
const userData = useUser();
const router = useRouter();
const { show, hide } = useLoader();
const logout = () => {
	show();
	axios
		.post(
			'logout',
			{},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(({ data }) => {
			console.log(data);
			userData.user = {};
			localStorage.removeItem('userData');
			hide();
			router.push('/login');
		})
		.catch((error) => {
			console.error(error);
		});
};
</script>

<template>
	<QBtn v-if="userData.loggedIn" size="sm" round flat :icon="mdiAccount">
		<QMenu>
			<QList>
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
				<QItem to="/">
					<QItemSection side>
						<QIcon :name="mdiDraw" size="small" />
					</QItemSection>
					<QItemSection>Editor</QItemSection>
				</QItem>
				<QItem to="/dashboard">
					<QItemSection side>
						<QIcon :name="mdiViewDashboard" size="small" />
					</QItemSection>
					<QItemSection>Dashboard</QItemSection>
				</QItem>
				<QItem to="/account">
					<QItemSection side>
						<QIcon :name="mdiAccountCog" size="small" />
					</QItemSection>
					<QItemSection>Account</QItemSection>
				</QItem>
				<QItem clickable @click="logout">
					<QItemSection side>
						<QIcon :name="mdiLogout" size="small" />
					</QItemSection>
					<QItemSection>Logout</QItemSection>
				</QItem>
			</QList>
		</QMenu>
	</QBtn>
	<QBtn v-else size="sm" round flat :icon="mdiAccount" to="/login" />
</template>

<style scoped></style>
