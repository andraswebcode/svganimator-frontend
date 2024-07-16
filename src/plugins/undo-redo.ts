import { PiniaPluginContext } from 'pinia';
import { ProjectState } from '../store/project';
import { ref } from 'vue';

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
		const state = _undoStack.value.pop();

		if (state) {
			_isUndoRedoing = true;
			_redoStack.value.push(state);
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const redo = () => {
		const state = _redoStack.value.pop();
		if (state) {
			_isUndoRedoing = true;
			_undoStack.value.push(state);
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const canUndo = () => !!_undoStack.value.length;
	const canRedo = () => !!_redoStack.value.length;
	const startHistory = () => {
		store.$subscribe(() => {
			if (!_isUndoRedoing) {
				_undoStack.value.push({ ...store.$state } as ProjectState);
				_redoStack.value = [];
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
