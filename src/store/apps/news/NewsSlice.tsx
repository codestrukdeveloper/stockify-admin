import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";

interface StateType {
  newsposts: any[];
  recentPosts: any[];
  newsSearch: string;
  sortBy: string;
  selectedPost: any;
}

const initialState = {
  newsposts: [],
  recentPosts: [],
  newsSearch: "",
  sortBy: "newest",
  selectedPost: null,
};

export const NewsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    getPosts: (state: StateType, action) => {
      state.newsposts = action.payload;
    },
    getPost: (state: StateType, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { getPosts, getPost } = NewsSlice.actions;

export const fetchNewsPosts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get("/api/data/news/NewsPosts");
    dispatch(getPosts(response.data));
  } catch (err) {
    throw new Error();
  }
};
export const fetchNewsPost =
  (title: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("/api/data/news/post", { title });
      dispatch(getPost(response.data.post));
    } catch (err: any) {
      throw new Error(err);
    }
  };
export default NewsSlice.reducer;
