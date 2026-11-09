import { ProductSummary } from '../ProductSummary';
import { WarehouseOffers } from '../WarehouseOffers';
import s from './ProductCard.module.scss';

export const ProductCard = ({ product, kind = 'matched' }) => (
  <article className={s.ProductCard}>
    <ProductSummary product={product} kind={kind} />

    <div className={s.ProductCard__offers}>
      <h4 className={s.ProductCard__title}>Складские предложения</h4>

      <WarehouseOffers warehouses={product.warehouses ?? []} />
    </div>
  </article>
);
