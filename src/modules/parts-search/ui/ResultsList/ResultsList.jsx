import { useId, useState } from 'react';
import { Select } from '@/ui';
import { OffersTable } from '../OffersTable';
import { ProductCard } from '../ProductCard';
import { ResultsPagination } from '../ResultsPagination';
import s from './ResultsList.module.scss';

export const ResultsList = ({ items, view, sort, onSortChange }) => {
  const sortId = useId();
  const [page, setPage] = useState(1);
  const pageSize = view === 'offers' ? 50 : 20;
  const visibleItems = items.slice((page - 1) * pageSize, page * pageSize);

  const handleSortChange = (nextSort) => {
    setPage(1);
    onSortChange(nextSort);
  };

  const handleTableSort = (field) => {
    if (sort.field !== field) {
      handleSortChange({ field, direction: 'asc' });
    } else if (sort.direction === 'asc') {
      handleSortChange({ field, direction: 'desc' });
    } else {
      handleSortChange({ field: null, direction: 'asc' });
    }
  };

  return (
    <div className={s.ResultsList}>
      {view === 'offers' ? (
        <OffersTable rows={visibleItems} sort={sort} onSortChange={handleTableSort} />
      ) : (
        <div className={s.ResultsList__products}>
          <div className={s.ResultsList__sort}>
            <label htmlFor={sortId}>Сортировка</label>

            <Select
              id={sortId}
              className={s['ResultsList__sort-select']}
              value={sort.field ? `${sort.field}-${sort.direction}` : 'default'}
              onChange={(event) => {
                const [field, direction] = event.target.value.split('-');

                handleSortChange({
                  field: field === 'default' ? null : field,
                  direction: direction ?? 'asc'
                });
              }}>
              <option value="default">По умолчанию</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="stock-desc">Больше в наличии</option>
              <option value="stock-asc">Меньше в наличии</option>
            </Select>
          </div>

          {visibleItems.map((group) => (
            <ProductCard key={group.id} {...group} />
          ))}
        </div>
      )}

      {items.length > pageSize && (
        <ResultsPagination page={page} pageSize={pageSize} total={items.length} onPageChange={setPage} />
      )}
    </div>
  );
};
