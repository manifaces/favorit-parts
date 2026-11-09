import { useMediaQueryResult } from '@/shared';
import { ArrowLeftIcon, Button } from '@/ui';
import { ViewSwitcher } from '../ViewSwitcher';
import s from './ResultsHeader.module.scss';

export const ResultsHeader = ({
  article,
  manufacturer,
  view,
  onViewChange,
  onBack,
  showViewSwitcher = true
}) => {
  const isWide = useMediaQueryResult('(min-width: 768px)');

  return (
    <header className={s.ResultsHeader}>
      <h2 className={s.ResultsHeader__title}>Результаты поиска</h2>

      <p className={s.ResultsHeader__context}>
        Артикул: {article} · Производитель: {manufacturer}
      </p>

      <div className={s.ResultsHeader__actions}>
        <Button
          variant="tertiary"
          className={s.ResultsHeader__back}
          aria-label={isWide ? undefined : 'Вернуться к производителям'}
          onClick={onBack}>
          <ArrowLeftIcon />
          {isWide && 'Сменить производителя'}
        </Button>

        {showViewSwitcher && <ViewSwitcher view={view} onChange={onViewChange} />}
      </div>
    </header>
  );
};
