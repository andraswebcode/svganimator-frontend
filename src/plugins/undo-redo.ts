import { PiniaPluginContext } from 'pinia';
import { ProjectState } from '../store/project';
import { ref, toRaw } from 'vue';

export interface UndoRedoActions {
	undo: () => void;
	redo: () => void;
	canUndo: () => boolean;
	canRedo: () => boolean;
	startHistory: () => void;
}

export default ({
	store
}: PiniaPluginContext<string, ProjectState>): UndoRedoActions | undefined => {
	if (store.$id !== 'project') {
		return;
	}

	let _undoStack = ref<ProjectState[]>([]);
	let _redoStack = ref<ProjectState[]>([]);
	let _isUndoRedoing = false;

	const undo = () => {
		const state = toRaw(_undoStack.value.pop());

		if (state) {
			_isUndoRedoing = true;
			_redoStack.value = [...toRaw(_redoStack.value), state];
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const redo = () => {
		const state = toRaw(_redoStack.value.pop());
		if (state) {
			_isUndoRedoing = true;
			_undoStack.value = [...toRaw(_undoStack.value), state];
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const canUndo = () => !!_undoStack.value.length;
	const canRedo = () => !!_redoStack.value.length;
	const startHistory = () => {
		store.$subscribe(() => {
			if (!_isUndoRedoing) {
				const state = JSON.parse(JSON.stringify(toRaw(store.$state)));
				_undoStack.value = [...toRaw(_undoStack.value), state];
				_redoStack.value = [];
				console.log(toRaw(_undoStack.value), toRaw(_redoStack.value));
			}
		});
	};

	return {
		undo,
		redo,
		canUndo,
		canRedo,
		startHistory
	};
};
