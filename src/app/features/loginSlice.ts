import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import cookieService from "../../services/CookieService";
import { IUser } from "../../interfaces";

const { toast } = createStandaloneToast();

export interface IError {
  response: {
    data: {
      error: string;
    };
  };
}

interface IResponseData {
  success: boolean;
  results: {
    token: string;
  };
}

interface IInitialState {
  data: IResponseData | null;
  isLoading: boolean;
  isError: boolean;
  error: IError | unknown;
}

const initialState: IInitialState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
};

// First, create the thunk
export const userLogin = createAsyncThunk<
  IResponseData /* The returned value (success case)*/,
  IUser /*The argument type*/,
  { rejectValue: IError } /*The rejected value type*/
>("products/productsSlice", async (user: IUser, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await axiosInstance.post("auth/signin", user);
    return response.data as IResponseData;
  } catch (error) {
    return rejectWithValue(error as IError);
  }
});

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ** pending
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });

    // ** fulfilled = success
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;

      // ** Cookies
      const date = new Date();
      const IN_DAYS = 3;
      const IN_HOURS = 1000 * 60 * 60 * 24;
      const EXPIRES_IN_Days = IN_DAYS * IN_HOURS;
      date.setTime(date.getTime() + EXPIRES_IN_Days);
      const options = { path: "/", expires: date };
      cookieService.set("jwt", action?.payload?.results.token, options);

      toast({
        title: "Logged in Successfully",
        description:
          "You will navigate to the Home page after 2 seconds to login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        // ** need to reload page
        location.replace("/");
      }, 2000);
    });

    // ** rejected
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = null;
      state.error = action.payload;

      console.log(action.payload);

      toast({
        title: action?.payload?.response.data.error || "Unknown error",
        description: "try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  },
});

export default loginSlice.reducer;
