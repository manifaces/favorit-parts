import clsx from 'clsx';
import s from './FeedbackState.module.scss';

export const FeedbackState = ({ icon, title, description, children, className, role = 'status' }) => (
  <div className={clsx(s.FeedbackState, className)} role={role}>
    <div className={s.FeedbackState__icon}>{icon}</div>

    <div className={s.FeedbackState__copy}>
      <h3 className={s.FeedbackState__title}>{title}</h3>
      <p className={s.FeedbackState__description}>{description}</p>
    </div>

    {children}
  </div>
);
