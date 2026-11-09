import { IconButton, LayoutGridIcon, ListIcon } from '@/ui';
import s from './ViewSwitcher.module.scss';

export const ViewSwitcher = ({ view, onChange }) => {
  const showProducts = view === 'offers';
  const label = showProducts ? 'Показать карточки товаров' : 'Показать таблицу предложений';

  return (
    <IconButton
      className={s.ViewSwitcher}
      aria-label={label}
      title={label}
      onClick={() => onChange(showProducts ? 'products' : 'offers')}>
      {showProducts ? <LayoutGridIcon /> : <ListIcon />}
    </IconButton>
  );
};
