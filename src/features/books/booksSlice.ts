import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface BooksState {
	totalItems: number | "start" | "loading";
	items: any[];
	pageSize: number;
	label: string;
	viewCategory: string[];
	category: number;
	viewSort: string[],
	sort: number;
}

const initialState: BooksState = {
	totalItems: "start",
	items: [],
	pageSize: 30,
	label: "the witcher",
	viewCategory: ["all", "art", "biography", "computers", "history", "medical", "poetry"],
	category: 0,
	viewSort: ["relevance", "newest"],
	sort: 0
};

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action) => {
			state.totalItems = action.payload.totalItems;
			state.items = action.payload.items;
			console.log(state.items)
		},
		addBooks: (state, action) => {
			state.totalItems = action.payload.totalItems;
			state.items = state.items.concat(action.payload.items)
			console.log(state.items)
		},
		setLabel: (state, action) => {
			state.label = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setLoading: (state) => {
			state.totalItems = "loading";
		}
	}
});

export const { setBooks, addBooks, setLabel, setCategory, setSort, setLoading } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books.items;

export default booksSlice.reducer;
