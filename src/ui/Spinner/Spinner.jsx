import clsx from 'clsx';
import { LoaderCircleIcon } from '../Icon';
import s from './Spinner.module.scss';

export const Spinner = ({ size = 32, className }) => (
  <LoaderCircleIcon width={size} height={size} className={clsx(s.Spinner, className)} />
);
