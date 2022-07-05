import { createSlice } from '@reduxjs/toolkit';

const initialUIState = {
	notification: {
		status: '',
		title: '',
		message: '',
		showme: false,
	},
};

const uiSlice = createSlice({
	name: 'cart',
	initialState: initialUIState,
	reducers: {
		showNotification: (state, actions) => {
			const { status, title, message, showme } = actions.payload;
			state.notification = {
				status,
				title,
				message,
				showme,
			};
		},

		hideNotification: state => {
			state.notification = { ...state.notification, showme: false };
		},
	},
});

export default uiSlice;
export const { showNotification, hideNotification } = uiSlice.actions;
