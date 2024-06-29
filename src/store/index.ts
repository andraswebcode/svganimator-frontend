import { createPinia } from 'pinia';
import useEditor from './editor';
import useUser from './user';
import useProject from './project';

export default createPinia();
export { useEditor, useUser, useProject };
