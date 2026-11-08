import { useRef } from 'react';
import clsx from 'clsx';
import { XIcon } from '../Icon';
import s from './Input.module.scss';

export const Input = ({
  value,
  onClear,
  type = 'text',
  className,
  disabled,
  readOnly,
  onPointerDown,
  onClick,
  onBlur,
  ...rest
}) => {
  const inputRef = useRef(null);
  const showClear = onClear && value != null && value !== '' && !disabled && !readOnly;

  return (
    <div className={clsx(s.Input, showClear && s.Input_clearable, className)}>
      <input
        {...rest}
        ref={inputRef}
        className={s.Input__control}
        type={type}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onPointerDown={(event) => {
          event.currentTarget.dataset.pointerFocus = 'true';
          onPointerDown?.(event);
        }}
        onClick={(event) => {
          if (event.detail > 0) event.currentTarget.dataset.pointerFocus = 'true';
          onClick?.(event);
        }}
        onBlur={(event) => {
          delete event.currentTarget.dataset.pointerFocus;
          onBlur?.(event);
        }}
      />
      {showClear && (
        <button
          type="button"
          className={s.Input__clear}
          aria-label="Очистить поле"
          onClick={(event) => {
            onClear();
            inputRef.current.dataset.pointerFocus = String(event.detail > 0);
            inputRef.current.focus();
          }}>
          <XIcon />
        </button>
      )}
    </div>
  );
};
