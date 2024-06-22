<script setup></script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<VCard>
						<VCardItem>
							<VCardTitle>
								<slot name="title" />
							</VCardTitle>
							<VCardSubtitle>
								<slot name="subtitle" />
							</VCardSubtitle>
						</VCardItem>
						<VDivider />
						<VCardText>
							<VForm>
								<slot />
							</VForm>
						</VCardText>
						<VDivider />
						<VCardActions>
							<slot name="actions" />
						</VCardActions>
					</VCard>
				</VCol>
			</VRow>
		</VContainer>
	</VMain>
</template>

<style scoped>
.v-container,
.v-row {
	height: 100%;
}
</style>
