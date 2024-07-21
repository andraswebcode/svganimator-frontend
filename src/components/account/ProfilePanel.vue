<script setup>
import { mdiCheckBold, mdiClose, mdiPencil } from '@mdi/js';
import { ref } from 'vue';
import { useUser } from '../../store';
import { useNotice } from '../../hooks';
import axios from '../../axios';

const userData = useUser();
const { send } = useNotice();
const nameRef = ref(null);
const emailRef = ref(null);
const pwRef = ref(null);
const fields = ref({
	name: userData.user.name,
	email: userData.user.email,
	password: '',
	edit_name: false,
	edit_email: false,
	edit_password: false,
	loading_name: false,
	loading_email: false,
	loading_password: false,
	confirm_password_name: '',
	confirm_password_email: '',
	confirm_password_password: ''
});

const edit = (field) => {
	fields.value['edit_' + field] = true;
	fields.value['confirm_password_' + field] = '';
	setTimeout(() => {
		if (field === 'name') {
			nameRef.value.focus();
		} else if (field === 'email') {
			emailRef.value.focus();
		} else {
			pwRef.value.focus();
		}
	}, 40);
};
const done = (field) => {
	fields.value['loading_' + field] = true;
	axios
		.post(
			'profile',
			{
				[field]: fields.value[field],
				confirm_password: fields.value['confirm_password_' + field]
			},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(({ data }) => {
			userData.user[field] = data.user[field];
			localStorage.setItem('userData', JSON.stringify(userData.user));
			fields.value['edit_' + field] = false;
			fields.value['loading_' + field] = false;
			send('Field: ' + field + ' updated successfully.', 'positive');
		})
		.catch((error) => {
			console.error(error);
			fields.value['loading_' + field] = false;
			send(error.response?.data.message || error.message, 'negative');
		});
};
const cancel = (field) => {
	fields.value['edit_' + field] = false;
	fields.value[field] = userData.user[field];
};
</script>

<template>
	<!-- Name -->
	<QField v-if="fields.edit_name" class="q-mb-sm" square borderless stack-label>
		<template v-slot:control>
			<QInput
				ref="nameRef"
				type="text"
				label="Name"
				class="col-grow"
				autocomplete="off"
				v-model="fields.name"
			/>
			<QInput
				type="password"
				label="Password"
				class="col-grow"
				autocomplete="new-password"
				v-model="fields.confirm_password_name"
			>
				<template v-slot:append>
					<QBtnGroup flat square>
						<QBtn
							:icon="mdiCheckBold"
							:loading="fields.loading_name"
							@click="done('name')"
						/>
						<QBtn :icon="mdiClose" @click="cancel('name')" />
					</QBtnGroup>
				</template>
			</QInput>
		</template>
	</QField>
	<QInput v-else label="Name" class="q-mb-sm" square borderless readonly v-model="fields.name">
		<template v-slot:append>
			<QBtn :icon="mdiPencil" flat square @click="edit('name')" />
		</template>
	</QInput>
	<!-- Email -->
	<QField v-if="fields.edit_email" class="q-mb-sm" square borderless stack-label>
		<template v-slot:control>
			<QInput
				ref="emailRef"
				type="email"
				label="Email"
				class="col-grow"
				autocomplete="off"
				v-model="fields.email"
			/>
			<QInput
				type="password"
				label="Password"
				class="col-grow"
				autocomplete="new-password"
				v-model="fields.confirm_password_email"
			>
				<template v-slot:append>
					<QBtnGroup>
						<QBtn
							:icon="mdiCheckBold"
							flat
							square
							:loading="fields.loading_email"
							@click="done('email')"
						/>
						<QBtn :icon="mdiClose" @click="cancel('email')" />
					</QBtnGroup>
				</template>
			</QInput>
		</template>
	</QField>
	<QInput v-else label="Email" class="q-mb-sm" square borderless readonly v-model="fields.email">
		<template v-slot:append>
			<QBtn :icon="mdiPencil" flat square @click="edit('email')" />
		</template>
	</QInput>
	<!-- Password -->
	<QField v-if="fields.edit_password" class="q-mb-sm" square borderless stack-label>
		<template v-slot:control>
			<QInput
				ref="pwRef"
				type="password"
				label="New Password"
				class="col-grow"
				autocomplete="new-password"
				v-model="fields.password"
			/>
			<QInput
				type="password"
				label="Password"
				class="col-grow"
				autocomplete="new-password"
				v-model="fields.confirm_password_password"
			>
				<template v-slot:append>
					<QBtnGroup>
						<QBtn
							:icon="mdiCheckBold"
							flat
							square
							:loading="fields.loading_password"
							@click="done('password')"
						/>
						<QBtn :icon="mdiClose" @click="cancel('password')" />
					</QBtnGroup>
				</template>
			</QInput>
		</template>
	</QField>
	<QInput
		v-else
		type="password"
		label="Password"
		model-value="********"
		class="q-mb-sm"
		square
		borderless
		readonly
	>
		<template v-slot:append>
			<QBtn :icon="mdiPencil" flat square @click="edit('password')" />
		</template>
	</QInput>
</template>

<style scoped></style>
