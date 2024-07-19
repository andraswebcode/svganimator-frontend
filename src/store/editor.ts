import { defineStore } from 'pinia';

declare type Tool = 'list' | 'shapes' | 'text' | 'uploads' | 'images' | 'settings';
declare type Mode = 'select' | 'draw' | 'pan';

export interface EditorState {
	// UI
	tool: Tool;
	showRulers: boolean;
	showGrid: boolean;
	showRightSideBar: boolean;
	showLeftSideBar: boolean;
	timelineHeight: number;
	// Canvas
	mode: Mode;
	zoom: number;
	panX: number;
	panY: number;
	// Pencil
	penWidth: number;
	penColor: string;
	// Layers
	activeLayerIds: string[];
	// Times
	time: number;
	seconds: number;
	secondWidth: number;
	trackLeft: number;
	playing: boolean;
	// Dialogs
	exportDialog: boolean;
}

export type EditorGetters = {
	formatTime: (state: EditorState) => string;
	secondList: (state: EditorState) => string[];
	secondMarkList: (state: EditorState) => string[];
};

export interface EditorActions {
	selectLayer: (id: string) => void;
}

export default defineStore<string, EditorState, EditorGetters, EditorActions>('editor', {
	state: () => ({
		// UI
		tool: 'list',
		showRulers: true,
		showGrid: false,
		showRightSideBar: true,
		showLeftSideBar: true,
		timelineHeight: 300,
		// Canvas
		mode: 'select',
		zoom: 1,
		panX: 0,
		panY: 0,
		// Pencil
		penWidth: 2,
		penColor: '#000',
		// Layers
		activeLayerIds: [],
		// Times
		time: 0,
		seconds: 30,
		secondWidth: 200,
		trackLeft: 0,
		playing: false,
		// Dialogs
		exportDialog: false
	}),
	getters: {
		formatTime: (state) => {
			// @ts-ignore
			const date = new Date(null);
			date.setMilliseconds(state.time * 1000);
			return date.toISOString().substring(14, 22);
		},
		secondList: (state) =>
			Array(state.seconds)
				.fill('')
				.map((_, i) => '' + i),
		secondMarkList: () => Array(10).fill('')
	},
	actions: {
		selectLayer(id) {
			this.mode = 'select';
			setTimeout(() => {
				if (this.activeLayerIds.includes(id)) {
					this.activeLayerIds = [];
				} else {
					this.activeLayerIds = [id];
				}
			}, 0);
		}
	}
});
