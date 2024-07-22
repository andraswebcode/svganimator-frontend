import { ShapeObject } from '@grafikjs/core';
import { defineStore } from 'pinia';

export type DashboardQueryParams = {
	page?: number;
	search?: string;
	date?: string;
};

export type PreviewItem = {
	id: number;
	title: string;
	data: ShapeObject[];
	width: number;
	height: number;
};

export interface DashboardState {
	projects: any[];
	totalPages: number;
	showPreview: boolean;
	preview: PreviewItem | null;
}

export interface DashboardGetters {}

export interface DashboardActions {}

export default defineStore<string, DashboardState>('dashboard', {
	state: () => ({
		projects: [],
		totalPages: 1,
		showPreview: false,
		preview: null
	})
});
