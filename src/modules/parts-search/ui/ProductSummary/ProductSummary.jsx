import clsx from 'clsx';
import { Badge } from '@/ui';
import { formatPrice, formatStock, getMinAvailablePrice } from '../../lib';
import s from './ProductSummary.module.scss';

export const ProductSummary = ({ product, kind = 'matched', className }) => {
  const minPrice = getMinAvailablePrice(product);
  const count = product.count == null || String(product.count).trim() === '' ? null : Number(product.count);

  return (
    <div className={clsx(s.ProductSummary, className)}>
      <div className={s.ProductSummary__information}>
        <div className={s.ProductSummary__identity}>
          <span className={s.ProductSummary__brand}>{product.brand || '—'}</span>
          <span className={s.ProductSummary__number}>{product.number || '—'}</span>
          {kind === 'analogue' && <Badge>Аналог</Badge>}
        </div>

        <h3 className={s.ProductSummary__name}>{product.name || 'Название не указано'}</h3>

        {minPrice !== null && <p className={s.ProductSummary__price}>Цена от {formatPrice(minPrice)}</p>}

        {product.notRefund && <p className={s.ProductSummary__return}>Не подлежит возврату</p>}
      </div>

      <div className={s.ProductSummary__availability}>
        <span className={s.ProductSummary__label}>
          {count == null ? 'Наличие не указано' : count > 0 ? 'В наличии' : 'Нет в наличии'}
        </span>
        {(count == null || count > 0) && (
          <span className={s.ProductSummary__stock}>{formatStock(count)}</span>
        )}
      </div>
    </div>
  );
};
