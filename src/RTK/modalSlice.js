import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isLoginModalOpen: false,
    isMapModalOpen: false,
    },
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
      // 필요에 따라 다른 모달을 닫을 수도 있음
      // state.isMapModalOpen = false;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openMapModal: (state) => {
      console.log("openMapModal 실행됨!", state.isMapModalOpen);
      state.isMapModalOpen = true;
      // 필요에 따라 다른 모달을 닫을 수도 있음
      // state.isLoginModalOpen = false;
    },
    closeMapModal: (state) => {
      console.log("closeMapModal 실행됨!");
      state.isMapModalOpen = false;
    },
  },
});

export const {openLoginModal, closeLoginModal, openMapModal, closeMapModal} = modalSlice.actions;
export default modalSlice.reducer;