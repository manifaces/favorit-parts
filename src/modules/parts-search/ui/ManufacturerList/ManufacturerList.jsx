import { useState } from 'react';
import { pluralize, useMediaQueryResult } from '@/shared';
import { Button, ChevronDownIcon } from '@/ui';
import { ManufacturerItem } from '../ManufacturerItem';
import s from './ManufacturerList.module.scss';

export const ManufacturerList = ({ manufacturers, onSelect }) => {
  const isWide = useMediaQueryResult('(min-width: 768px)');
  const [batches, setBatches] = useState(1);

  const sorted = [...manufacturers].sort((a, b) => a.localeCompare(b, 'ru', { sensitivity: 'base' }));
  const batchSize = isWide ? 12 : 8;
  const visibleCount = batches * batchSize;
  const nextCount = Math.min(batchSize, sorted.length - visibleCount);

  return (
    <div className={s.ManufacturerList}>
      <ul className={s.ManufacturerList__grid}>
        {sorted.slice(0, visibleCount).map((manufacturer) => (
          <li key={manufacturer}>
            <ManufacturerItem manufacturer={manufacturer} onSelect={onSelect} />
          </li>
        ))}
      </ul>

      {nextCount > 0 && (
        <Button
          variant="outlined"
          className={s.ManufacturerList__more}
          onClick={() => setBatches(batches + 1)}>
          <ChevronDownIcon />
          Показать ещё {nextCount} {pluralize(nextCount, 'производителя', 'производителя', 'производителей')}
        </Button>
      )}
    </div>
  );
};
