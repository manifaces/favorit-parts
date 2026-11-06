import { createSelector } from '@reduxjs/toolkit';
import { filterEmptyGoods, getManufacturers, getOfferRows, getResultProducts } from '../lib';

const selectGoods = (state) => state.parts.goods;
const selectGoodsWithAnalogues = (state) => state.parts.goodsWithAnalogues;

export const selectArticle = (state) => state.parts.article;
export const selectSelectedBrand = (state) => state.parts.selectedBrand;
export const selectIsSearching = (state) => state.parts.isSearching;
export const selectSearchError = (state) => state.parts.searchError;
export const selectIsLoadingAnalogues = (state) => state.parts.isLoadingAnalogues;
export const selectAnaloguesError = (state) => state.parts.analoguesError;

export const selectSearchGoods = createSelector([selectGoods], (goods) => filterEmptyGoods(goods ?? []));
export const selectManufacturers = createSelector([selectSearchGoods], getManufacturers);
export const selectResultProducts = createSelector([selectGoodsWithAnalogues], (goods) =>
  getResultProducts(goods ?? [])
);
export const selectOfferRows = createSelector([selectGoodsWithAnalogues], (goods) =>
  getOfferRows(goods ?? [])
);

export const selectIsSearchEmpty = (state) =>
  selectGoods(state) !== null && selectSearchGoods(state).length === 0;

export const selectIsAnaloguesEmpty = (state) =>
  selectGoodsWithAnalogues(state) !== null && selectResultProducts(state).length === 0;
