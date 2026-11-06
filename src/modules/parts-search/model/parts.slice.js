import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPartsWithAnalogues, getPartsErrorMessage, searchParts } from '@/services';

export const searchByArticle = createAsyncThunk(
  'parts/searchByArticle',
  async (article, { signal, rejectWithValue }) => {
    try {
      return await searchParts(article, { signal });
    } catch (error) {
      if (signal.aborted) throw error;
      return rejectWithValue(getPartsErrorMessage(error));
    }
  },
  {
    condition: (article, { getState }) => {
      const parts = getState().parts;
      return !parts.isSearching || parts.article !== article;
    }
  }
);

export const loadPartsWithAnalogues = createAsyncThunk(
  'parts/loadPartsWithAnalogues',
  async (brand, { getState, signal, rejectWithValue }) => {
    const { article } = getState().parts;

    try {
      return await fetchPartsWithAnalogues(article, brand, { signal });
    } catch (error) {
      if (signal.aborted) throw error;
      return rejectWithValue(getPartsErrorMessage(error));
    }
  },
  {
    condition: (brand, { getState }) => {
      const parts = getState().parts;
      return (
        !parts.isSearching &&
        parts.goods !== null &&
        (!parts.isLoadingAnalogues || parts.selectedBrand !== brand)
      );
    }
  }
);

const initialState = {
  article: '',
  goods: null,
  selectedBrand: null,
  goodsWithAnalogues: null,
  isSearching: false,
  searchError: null,
  isLoadingAnalogues: false,
  analoguesError: null,
  searchRequestId: null,
  analoguesRequestId: null
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    returnToManufacturers: (state) => {
      state.selectedBrand = null;
      state.goodsWithAnalogues = null;
      state.isLoadingAnalogues = false;
      state.analoguesError = null;
      state.analoguesRequestId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByArticle.pending, (state, { meta }) => {
        state.article = meta.arg;
        state.goods = null;
        state.selectedBrand = null;
        state.goodsWithAnalogues = null;
        state.isSearching = true;
        state.searchError = null;
        state.isLoadingAnalogues = false;
        state.analoguesError = null;
        state.searchRequestId = meta.requestId;
        state.analoguesRequestId = null;
      })
      .addCase(searchByArticle.fulfilled, (state, { payload, meta }) => {
        if (state.searchRequestId !== meta.requestId) return;

        state.goods = payload;
        state.isSearching = false;
        state.searchRequestId = null;
      })
      .addCase(searchByArticle.rejected, (state, { payload, meta }) => {
        if (state.searchRequestId !== meta.requestId) return;

        state.isSearching = false;
        state.searchError = meta.aborted ? null : payload;
        state.searchRequestId = null;
      })
      .addCase(loadPartsWithAnalogues.pending, (state, { meta }) => {
        state.selectedBrand = meta.arg;
        state.goodsWithAnalogues = null;
        state.isLoadingAnalogues = true;
        state.analoguesError = null;
        state.analoguesRequestId = meta.requestId;
      })
      .addCase(loadPartsWithAnalogues.fulfilled, (state, { payload, meta }) => {
        if (state.analoguesRequestId !== meta.requestId) return;

        state.goodsWithAnalogues = payload;
        state.isLoadingAnalogues = false;
        state.analoguesRequestId = null;
      })
      .addCase(loadPartsWithAnalogues.rejected, (state, { payload, meta }) => {
        if (state.analoguesRequestId !== meta.requestId) return;

        state.isLoadingAnalogues = false;
        state.analoguesError = meta.aborted ? null : payload;
        state.analoguesRequestId = null;
      });
  }
});

export const { returnToManufacturers } = partsSlice.actions;
export const partsReducer = partsSlice.reducer;
