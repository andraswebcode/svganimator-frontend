<script setup>
import AppBar from '../components/editor/AppBar.vue';
import OptionsMenu from '../components/editor/OptionsMenu.vue';
import ToolBar from '../components/editor/ToolBar.vue';
import LeftSideBar from '../components/editor/LeftSideBar.vue';
import RightSideBar from '../components/editor/RightSideBar.vue';
import MainContent from '../components/editor/MainContent.vue';
import TimeLine from '../components/editor/TimeLine.vue';
</script>

<template>
	<OptionsMenu />
	<AppBar />
	<ToolBar />
	<LeftSideBar />
	<MainContent />
	<RightSideBar />
	<TimeLine />
</template>

<style scoped></style>
