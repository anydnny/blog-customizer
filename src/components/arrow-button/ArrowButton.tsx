import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = (props: { handle: OnClick; open: boolean }) => {
	const { handle, open } = props;

	const arrowStyles = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: open,
	});
	const containerStyles = clsx({
		[styles.container]: true,
		[styles.container_open]: open,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyles}
			onClick={handle}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyles} />
		</div>
	);
};
