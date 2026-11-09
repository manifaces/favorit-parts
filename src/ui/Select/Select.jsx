import clsx from 'clsx';
import { ChevronDownIcon } from '../Icon';
import s from './Select.module.scss';

export const Select = ({ children, className, onPointerDown, onClick, onBlur, ...rest }) => (
  <div className={clsx(s.Select, className)}>
    <select
      {...rest}
      className={s.Select__control}
      onPointerDown={(event) => {
        event.currentTarget.dataset.pointerFocus = 'true';
        onPointerDown?.(event);
      }}
      onClick={(event) => {
        if (event.detail > 0) event.currentTarget.dataset.pointerFocus = 'true';
        onClick?.(event);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          delete event.currentTarget.dataset.pointerFocus;
        }

        onBlur?.(event);
      }}>
      {children}
    </select>

    <ChevronDownIcon className={s.Select__icon} />
  </div>
);
