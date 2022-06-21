import { createSlice } from '@reduxjs/toolkit';

const initialUIState = {
	notification: {
		status: '',
		title: '',
		message: '',
	},
};

const uiSlice = createSlice({
	name: 'cart',
	initialState: initialUIState,
	reducers: {
		showNotification: (state, actions) => {
			const { status, title, message } = actions.payload;
			state.notification = {
				status,
				title,
				message,
			};
		},
	},
});

export default uiSlice;
export const { showNotification } = uiSlice.actions;
