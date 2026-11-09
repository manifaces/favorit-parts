import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_ERROR_MESSAGE } from '@/services';
import { useMediaQueryResult } from '@/shared';
import { AlertCircleIcon, FeedbackState, LoadingState, SearchXIcon } from '@/ui';
import { sortPartsResults } from './lib';
import {
  loadPartsWithAnalogues,
  returnToManufacturers,
  searchByArticle,
  selectAnaloguesError,
  selectArticle,
  selectIsAnaloguesEmpty,
  selectIsLoadingAnalogues,
  selectIsSearching,
  selectIsSearchEmpty,
  selectManufacturers,
  selectOfferRows,
  selectResultProducts,
  selectSearchGoods,
  selectSearchError,
  selectSelectedBrand
} from './model';
import { ManufacturerList, ResultsHeader, ResultsList, SearchForm } from './ui';
import s from './PartsSearch.module.scss';

const DEFAULT_SORT = { field: null, direction: 'asc' };

export const PartsSearch = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const manufacturer = useSelector(selectSelectedBrand);
  const manufacturers = useSelector(selectManufacturers);
  const searchGoods = useSelector(selectSearchGoods);
  const isSearchEmpty = useSelector(selectIsSearchEmpty);
  const products = useSelector(selectResultProducts);
  const offerRows = useSelector(selectOfferRows);
  const isSearching = useSelector(selectIsSearching);
  const isLoadingAnalogues = useSelector(selectIsLoadingAnalogues);
  const searchError = useSelector(selectSearchError);
  const analoguesError = useSelector(selectAnaloguesError);
  const isAnaloguesEmpty = useSelector(selectIsAnaloguesEmpty);

  const isDesktop = useMediaQueryResult('(min-width: 1280px)');
  const [draft, setDraft] = useState(article);
  const [inputError, setInputError] = useState('');
  const [manualView, setManualView] = useState(null);
  const view = manualView ?? (isDesktop ? 'offers' : 'products');
  const [sort, setSort] = useState(DEFAULT_SORT);

  const requests = useRef({ search: null, offers: null });

  useEffect(() => {
    const pending = requests.current;

    return () => {
      pending.search?.abort();
      pending.offers?.abort();
    };
  }, []);

  const handleSubmit = () => {
    const number = draft.trim();

    if (!number) {
      setInputError('Укажите артикул детали');
      return;
    }

    if (requests.current.search?.arg === number) return;
    if (number === article && !searchError && (searchGoods.length > 0 || isSearchEmpty)) return;

    requests.current.search?.abort();
    requests.current.offers?.abort();
    setInputError('');
    setSort(DEFAULT_SORT);

    const request = dispatch(searchByArticle(number));
    requests.current.search = request;

    request.then(() => {
      if (requests.current.search === request) requests.current.search = null;
    });
  };

  const selectManufacturer = (brand) => {
    if (requests.current.offers?.arg === brand) return;

    requests.current.offers?.abort();

    const request = dispatch(loadPartsWithAnalogues(brand));
    requests.current.offers = request;

    request.then(() => {
      if (requests.current.offers === request) requests.current.offers = null;
    });
  };

  const handleChange = (event) => {
    setDraft(event.target.value);
    setInputError('');
  };

  const handleClear = () => {
    setDraft('');
    setInputError('');
  };

  const handleBack = () => {
    requests.current.offers?.abort();
    requests.current.offers = null;
    dispatch(returnToManufacturers());
  };

  const busy = isSearching || isLoadingAnalogues;
  const items = useMemo(
    () => sortPartsResults(view === 'offers' ? offerRows : products, sort, view),
    [offerRows, products, sort, view]
  );

  const renderContent = () => {
    if (busy) {
      return (
        <div className={s.PartsSearch__state}>
          <LoadingState
            className={s.PartsSearch__feedback}
            title={isSearching ? 'Ищем производителей' : 'Загружаем предложения'}
            description={
              isSearching
                ? 'Подбираем бренды по указанному артикулу.'
                : 'Ищем детали и аналоги выбранного производителя.'
            }
          />
        </div>
      );
    }

    if (searchError) {
      return (
        <div className={s.PartsSearch__state}>
          <FeedbackState
            className={s.PartsSearch__feedback}
            icon={<AlertCircleIcon className={s['PartsSearch__error-icon']} />}
            title="Не удалось загрузить производителей"
            description={
              searchError === DEFAULT_ERROR_MESSAGE ? 'Попробуйте выполнить поиск ещё раз' : searchError
            }
            role="alert"
          />
        </div>
      );
    }

    if (analoguesError) {
      return (
        <div className={s.PartsSearch__state}>
          <FeedbackState
            className={s.PartsSearch__feedback}
            icon={<AlertCircleIcon className={s['PartsSearch__error-icon']} />}
            title="Не удалось загрузить предложения"
            description={
              analoguesError === DEFAULT_ERROR_MESSAGE
                ? 'Вернитесь к производителям и повторите выбор'
                : analoguesError
            }
            role="alert"
          />
        </div>
      );
    }

    if (isAnaloguesEmpty) {
      return (
        <div className={s.PartsSearch__state}>
          <FeedbackState
            className={s.PartsSearch__feedback}
            icon={<SearchXIcon />}
            title="Предложения не найдены"
            description="Для выбранного производителя нет предложений. Можно выбрать другого."
          />
        </div>
      );
    }

    if (manufacturer) {
      return <ResultsList key={view} items={items} view={view} sort={sort} onSortChange={setSort} />;
    }

    if (manufacturers.length > 0) {
      return (
        <section className={s.PartsSearch__manufacturers}>
          <div className={s['PartsSearch__manufacturers-header']}>
            <h2 className={s.PartsSearch__title}>Выберите производителя</h2>
            <p className={s.PartsSearch__article}>Артикул: {article}</p>
          </div>

          <ManufacturerList key={article} manufacturers={manufacturers} onSelect={selectManufacturer} />
        </section>
      );
    }

    if (article) {
      return (
        <div className={s.PartsSearch__state}>
          <FeedbackState
            className={s.PartsSearch__feedback}
            icon={<SearchXIcon />}
            title="Производители не найдены"
            description="Попробуйте проверить артикул или ввести другой"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={s.PartsSearch}>
      <SearchForm
        value={draft}
        onChange={handleChange}
        onClear={handleClear}
        onSubmit={handleSubmit}
        error={inputError}
      />

      {manufacturer && !busy && !searchError ? (
        <section className={s.PartsSearch__results}>
          <ResultsHeader
            article={article}
            manufacturer={manufacturer}
            view={view}
            onViewChange={setManualView}
            onBack={handleBack}
            showViewSwitcher={!analoguesError && !isAnaloguesEmpty}
          />

          {renderContent()}
        </section>
      ) : (
        renderContent()
      )}
    </div>
  );
};
