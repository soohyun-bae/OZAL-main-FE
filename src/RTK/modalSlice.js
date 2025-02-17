import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modals: {
      login: false,
      map: false,
      tags: false,
    }
    },
  reducers: {
    openModal: (state, action) => {
      state.modals[action.payload] = true;
      // 필요에 따라 다른 모달을 닫을 수도 있음
      // state.isMapModalOpen = false;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;