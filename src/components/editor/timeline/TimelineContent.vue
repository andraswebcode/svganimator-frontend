<script setup></script>

<template>
	<VRow class="content" no-gutters>
		<VCol class="settings"></VCol>
		<VCol class="tracks"> </VCol>
	</VRow>
</template>

<style scoped lang="scss">
@use './../../../styles/settings';
.content {
	min-height: 48px;
}
.settings {
	width: 312px;
	flex-grow: 0;
	flex-basis: auto;
	border-right: settings.$navigation-drawer-border-color settings.$navigation-drawer-border-style
		settings.$navigation-drawer-border-thin-width;
}
.tracks {
	position: relative;
	width: calc(100% - 312px);
	flex-basis: auto;
	overflow: hidden;
}
</style>
