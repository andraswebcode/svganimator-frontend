import { createPinia } from 'pinia';
import useEditor from './editor';
import useUser from './user';
import useProject from './project';
import undoRedo from '../plugins/undo-redo';

const pinia = createPinia();

pinia.use(undoRedo);

export default pinia;
export { useEditor, useUser, useProject };
