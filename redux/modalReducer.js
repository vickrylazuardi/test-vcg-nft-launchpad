import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalConfirmation: {
    loading: false,
    isOpen: false,
    isPlain: false,
    isSuccess: false,
    claimableMobile: false,
    title: {
      en: "Confirmation",
    },
  },
  modalBoxes: {
    loading: false,
    isOpen: false,
    title: {
      en: "Project Boxes",
    },
  },
  modalImages: {
    loading: false,
    isOpen: false,
    isText: false,
    title: {
      en: "Photo Box",
    },
  },
  modalDetailTransaction: {
    loading: false,
    isOpen: false,
    title: {
      en: "Detail Transaction",
    },
  },
  modalClaimable: {
    loading: false,
    showItem: false,
    isOpen: false,
    title: {
      en: "Claim Box",
    },
  },
  modalNewUser: {
    loading: false,
    isOpen: false,
    title: {
      en: "Information New User",
    },
  },
  modalSelectPayment: {
    loading: false,
    isOpen: false,
    title: {
      en: "Choose Payment Method",
    },
  },
  modalconfirm: {
    loading: false,
    isOpen: false,
    title: {
      en: "Purchase Confirmation",
    },
    text: {
      en: "",
    },
  },
  modalconfirmPrivacyPolicy: {
    loading: false,
    isOpen: false,
    title: {
      en: "Privacy Policy",
    },
    text: {
      en: "",
    },
  },
  modalSendOTP: {
    loading: false,
    isOpen: false,
    title: {
      en: "OTP Verification",
    }
  },
  modalFilterListProjectsWMR: {
    loading: false,
    isOpen: false,
    title: {
      en: "Filter",
    }
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModalBoxes: (state, val) => {
      if (val.payload) {
        state.modalBoxes.loading = val.payload.loading;
        state.modalBoxes.isOpen = val.payload.isOpen;
        state.modalBoxes.title = val.payload.title;
      }
    },
    toggleModalImages: (state, val) => {
      if (val.payload) {
        if (val.payload.isText) {
          state.modalImages.loading = val.payload.loading;
          state.modalImages.isOpen = val.payload.isOpen;
          state.modalImages.isText = val.payload.isText;
          state.modalImages.title = val.payload.title;
        } else {
          state.modalImages.loading = val.payload.loading;
          state.modalImages.isOpen = val.payload.isOpen;
          state.modalImages.isText = val.payload.isText;
          state.modalImages.title = val.payload.title;
        }
      }
    },
    toggleModalConfirmation: (state, val) => {
      if (val.payload) {
        if (val.payload.claimableMobile) {
          state.modalConfirmation.claimableMobile = val.payload.claimableMobile;
        }
        state.modalConfirmation.loading = val.payload.loading;
        state.modalConfirmation.isOpen = val.payload.isOpen;
        state.modalConfirmation.isPlain = val.payload.isPlain;
        state.modalConfirmation.isSuccess = val.payload.isSuccess;
        state.modalConfirmation.isFailed = val.payload.isFailed;
        state.modalConfirmation.title = val.payload.title;
      }
    },
    toggleModalTransaction: (state, val) => {
      if (val.payload) {
        state.modalDetailTransaction.loading = val.payload.loading;
        state.modalDetailTransaction.isOpen = val.payload.isOpen;
        state.modalDetailTransaction.isPlain = val.payload.isPlain;
        state.modalDetailTransaction.isSuccess = val.payload.isSuccess;
        state.modalDetailTransaction.title = val.payload.title;
      }
    },
    toggleModalClaimable: (state, val) => {
      if (val.payload) {
        state.modalClaimable.loading = val.payload.loading;
        state.modalClaimable.showItem = val.payload.showItem;
        state.modalClaimable.isOpen = val.payload.isOpen;
        state.modalClaimable.title = val.payload.title;
      }
    },
    toggleModalNewUser: (state, val) => {
      if (val.payload) {
        state.modalNewUser.loading = val.payload.loading;
        state.modalNewUser.isOpen = val.payload.isOpen;
		    state.modalNewUser.title = val.payload.title;
      }
    },
    toggleModalSelectPayment: (state, val) => {
      if (val.payload) {
        state.modalSelectPayment.loading = val.payload.loading;
        state.modalSelectPayment.isOpen = val.payload.isOpen;
		    state.modalSelectPayment.title = val.payload.title;
      }
    },
    toggleModalConfirm: (state, val) => {
      if (val.payload) {
        state.modalconfirm.loading = val.payload.loading;
        state.modalconfirm.isOpen = val.payload.isOpen;
		    state.modalconfirm.title = val.payload.title;
		    state.modalconfirm.text = val.payload.text;
      }
    },
    toggleModalConfirmPrivacyPolicy: (state, val) => {
      if (val.payload) {
        state.modalconfirmPrivacyPolicy.loading = val.payload.loading;
        state.modalconfirmPrivacyPolicy.isOpen = val.payload.isOpen;
		    state.modalconfirmPrivacyPolicy.title = val.payload.title;
		    state.modalconfirmPrivacyPolicy.text = val.payload.text;
      }
    },
    toggleModalSendOTP: (state, val) => {
      if (val.payload) {
        state.modalSendOTP.loading = val.payload.loading;
        state.modalSendOTP.isOpen = val.payload.isOpen;
		    state.modalSendOTP.title = val.payload.title;
      }
    },
    toggleModalFilterListProjectsWMR: (state, val) => {
      if (val.payload) {
        state.modalFilterListProjectsWMR.loading = val.payload.loading;
        state.modalFilterListProjectsWMR.isOpen = val.payload.isOpen;
		    state.modalFilterListProjectsWMR.title = val.payload.title;
      }
    },
  },
});

export const {
  toggleModalBoxes,
  toggleModalImages,
  toggleModalConfirmation,
  toggleModalTransaction,
  toggleModalClaimable,
  toggleModalNewUser,
  toggleModalSelectPayment,
  toggleModalConfirm,
  toggleModalConfirmPrivacyPolicy,
  toggleModalSendOTP,
  toggleModalFilterListProjectsWMR
} = modalSlice.actions;
export default modalSlice.reducer;
