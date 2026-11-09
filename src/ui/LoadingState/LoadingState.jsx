import clsx from 'clsx';
import { Spinner } from '../Spinner';
import s from './LoadingState.module.scss';

export const LoadingState = ({ title, description, className }) => (
  <div className={clsx(s.LoadingState, className)} role="status">
    <Spinner />

    <div className={s.LoadingState__copy}>
      <h3 className={s.LoadingState__title}>{title}</h3>
      <p className={s.LoadingState__description}>{description}</p>
    </div>
  </div>
);
