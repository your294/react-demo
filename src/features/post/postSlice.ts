import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Post {
    id: number,
    title: string,
    content: string,
};

const defaultValue: Array<Post> = [];

const fetchPostsMock: () => Promise<Array<Post>> = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                [
                    { id: 12345, title: 'First Post', content: 'Content of first post' },
                    { id: 23456, title: 'Second Post', content: 'Content of second post' },
                  ]
            )
        }, 2000)
    })
}

export const getPostsAsync = createAsyncThunk("posts/getPostAsync", fetchPostsMock);

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        entries: defaultValue,
        status: 'idle',
        error: null,
    },
    reducers: {
        postAdded: (state, action: PayloadAction<Post>) => {
            state.entries.push(action.payload);
        },
        postUpdated: (state, action: PayloadAction<Post>) => {
            const { id, title, content } = action.payload;
            const existingPost = state.entries.find((post) => post.id === id);
            if (existingPost) {
                existingPost.content = content;
                existingPost.title = title;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPostsAsync.pending, (state) => {
            state.status = 'loading'
        }).addCase(getPostsAsync.fulfilled, (state, action) => {
            state.entries = action.payload;
            state.status = 'idle';
        }).addCase(getPostsAsync.rejected, (state) => {
            state.status = 'error';
        })
    }
});

export const { postAdded, postUpdated } = postSlice.actions;
export default postSlice.reducer;