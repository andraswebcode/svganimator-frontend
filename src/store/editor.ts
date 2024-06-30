import { defineStore } from 'pinia';

declare type ActiveTool = 'list' | 'shapes' | 'text' | 'uploads' | 'images';
declare type ActiveMode = 'select' | 'draw' | 'pan';
declare type EditorState = {
	// UI
	activeTool: ActiveTool;
	activeMode: ActiveMode;
	showOptions: boolean;
	showRulers: boolean;
	showGrid: boolean;
	timelineHeight: number;
	// Layers
	activeLayerIds: string[];
	// Times
	time: number;
	seconds: number;
	secondWidth: number;
};

declare type EditorGetters = {
	formatTime: (state: EditorState) => string;
	secondList: (state: EditorState) => string[];
	secondNotchList: (state: EditorState) => string[];
	playheadPosition: (state: EditorState) => string;
};

declare type EditorActions = {
	selectLayer: (id: string) => void;
};

export default defineStore<string, EditorState, EditorGetters, EditorActions>('editor', {
	state: () => ({
		// UI
		activeTool: 'list',
		activeMode: 'select',
		showOptions: false,
		showRulers: true,
		showGrid: false,
		timelineHeight: 300,
		// Layers
		activeLayerIds: [],
		// Times
		time: 0,
		seconds: 30,
		secondWidth: 200
	}),
	getters: {
		formatTime: (state) => {
			const date = new Date(null);
			date.setMilliseconds(state.time * 1000);
			return date.toISOString().substring(14, 22);
		},
		secondList: (state) =>
			Array(state.seconds)
				.fill('')
				.map((_, i) => '' + i),
		secondNotchList: () => Array(10).fill(''),
		playheadPosition: (state) => {
			const pos = state.time * state.secondWidth;
			return pos + 'px';
		}
	},
	actions: {
		selectLayer(id) {
			if (this.activeLayerIds.includes(id)) {
				this.activeLayerIds = this.activeLayerIds.filter((_id) => id !== _id);
			} else {
				this.activeLayerIds = this.activeLayerIds.concat([id]);
			}
		}
	}
});
