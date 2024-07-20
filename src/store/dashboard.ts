import { defineStore } from 'pinia';
import axios from '../axios';
import { useUser } from '.';
import { useLoader, useNotice } from '../hooks';
import { serialize } from '../utils/project';

export type DashboardQueryParams = {
	page?: number;
	search?: string;
	date?: string;
};

export interface DashboardState {
	projects: any[];
	totalPages: number;
}

export interface DashboardGetters {}

export interface DashboardActions {}

export default defineStore<string, DashboardState>('dashboard', {
	state: () => ({
		projects: [],
		totalPages: 1
	})
});
