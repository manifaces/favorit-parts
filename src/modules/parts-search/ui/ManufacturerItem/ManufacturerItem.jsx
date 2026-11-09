import { ArrowRightIcon, Button } from '@/ui';
import s from './ManufacturerItem.module.scss';

export const ManufacturerItem = ({ manufacturer, onSelect }) => (
  <Button variant="outlined" className={s.ManufacturerItem} onClick={() => onSelect(manufacturer)}>
    <span>{manufacturer}</span>
    <ArrowRightIcon />
  </Button>
);
