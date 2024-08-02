import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../utils/geolocationApiHelper";

function getUserLocation() {
  return new Promise(function (resolve, reject) {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getUserLocation();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj.locality}, ${addressObj.city}, ${addressObj.countryName}  `;

    return { position, address };
  },
);

const initialState = {
  name: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUsername(state, action) {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = "there was a problem get your location";
        // state.error = action.error.message;
      }),
});

export const { createUsername } = userSlice.actions;

export default userSlice.reducer;
