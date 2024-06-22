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
	<VBtn id="user-menu" :icon="mdiAccount" />
	<VMenu activator="#user-menu">
		<VList>
			<VListItem v-if="userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiAccount" />
				</template>
				<VListItemTitle>{{ userData.user.name }}</VListItemTitle>
				<VListItemSubtitle>{{ userData.user.email }}</VListItemSubtitle>
			</VListItem>
			<VDivider v-if="userData.loggedIn" />
			<VListItem to="/" v-if="userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiDraw" />
				</template>
				<VListItemTitle>Editor</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard" v-if="userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiViewDashboard" />
				</template>
				<VListItemTitle>Dashboard</VListItemTitle>
			</VListItem>
			<VListItem to="/account" v-if="userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiAccountCog" />
				</template>
				<VListItemTitle>Account</VListItemTitle>
			</VListItem>
			<VListItem to="/login" v-if="!userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiLogin" />
				</template>
				<VListItemTitle>Login</VListItemTitle>
			</VListItem>
			<VListItem href="#" @click="logout" v-if="userData.loggedIn">
				<template v-slot:prepend>
					<VIcon :icon="mdiLogout" />
				</template>
				<VListItemTitle>Logout</VListItemTitle>
			</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped></style>
