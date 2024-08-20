// usamos nuestro snippet "redux-slice"

import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      // podemos hacer esta mutacion porque estamos con redux toolkit
      state.isDateModalOpen = true;

      // si estuvieramos con redux normal fuera de toolkit seria asi
      // return {
      //   ...state,
      //   isDateModalOpen: true,
      // }
    },

    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
