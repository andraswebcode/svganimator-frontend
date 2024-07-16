import { PiniaPluginContext } from 'pinia';
import { ProjectState } from '../store/project';

export interface UndoRedoActions {
	undo: () => void;
	redo: () => void;
	canUndo: () => boolean;
	canRedo: () => boolean;
	startHistory: () => void;
}

let _undoStack: ProjectState[] = [];
let _redoStack: ProjectState[] = [];
let _isUndoRedoing = false;

export default ({
	store
}: PiniaPluginContext<string, ProjectState>): UndoRedoActions | undefined => {
	if (store.$id !== 'project') {
		return;
	}

	const undo = () => {
		const state = _undoStack.pop();

		if (state) {
			_isUndoRedoing = true;
			_redoStack.push(state);
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const redo = () => {
		const state = _redoStack.pop();
		if (state) {
			_isUndoRedoing = true;
			_undoStack.push(state);
			store.$patch(state);
			_isUndoRedoing = false;
		}
	};
	const canUndo = () => !!_undoStack.length;
	const canRedo = () => !!_redoStack.length;
	const startHistory = () => {
		store.$subscribe(() => {
			if (!_isUndoRedoing) {
				_undoStack.push({ ...store.$state } as ProjectState);
				_redoStack = [];
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
