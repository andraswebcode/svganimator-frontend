<script setup>
import TopBar from '../components/TopBar.vue';
import ToolBar from '../components/ToolBar.vue';
import LeftSideBar from '../components/LeftSideBar.vue';
import MainContent from '../components/MainContent.vue';
import RightSideBar from '../components/RightSideBar.vue';
import TimeLine from '../components/TimeLine.vue';
</script>

<template>
	<ElContainer direction="vertical">
		<TopBar />
		<ElContainer>
			<ToolBar />
			<LeftSideBar />
			<MainContent />
			<RightSideBar />
		</ElContainer>
		<TimeLine />
	</ElContainer>
</template>

<style scoped></style>
