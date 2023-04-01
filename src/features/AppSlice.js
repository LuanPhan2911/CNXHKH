import { createSlice } from "@reduxjs/toolkit";
export const AppSlice = createSlice({
  name: "app",
  initialState: {
    fontSize: 17,
    color: "#000",
    backgroundColor: "#fff",
    fontFamily: "Palatino Linotype",
    askMarked: [],
    chapterId: 1,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload.color;
      state.backgroundColor = action.payload.backgroundColor;
    },
    changeFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    changeAskMarked: (state, action) => {
      let cpAskMarked = state.askMarked || [];
      let questionId = action.payload;
      let index = cpAskMarked.findIndex((item) => item === questionId);
      if (index === -1) {
        cpAskMarked.push(questionId);
      } else {
        cpAskMarked.splice(index, 1);
      }

      state.askMarked = [...cpAskMarked];
    },
    changeChapterId: (state, action) => {
      state.chapterId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeFontSize,
  changeColor,
  changeFontFamily,
  changeAskMarked,
  changeChapterId,
} = AppSlice.actions;

export default AppSlice.reducer;
