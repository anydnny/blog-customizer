import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { FormEvent, SetStateAction, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type Test = {
	submitForm: (e: FormEvent) => void;
	resetForm: () => void;
	formState: ArticleStateType;
	appState: ArticleStateType;
	setFormState: React.Dispatch<SetStateAction<ArticleStateType>>;
};
export const ArticleParamsForm = (props: Test) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		function handleOutsideClick(e: MouseEvent) {
			if (
				e.target instanceof Node &&
				formRef.current &&
				!formRef.current.contains(e.target)
			) {
				setIsMenuOpen(false);
			}
		}

		function handleEscClick(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		}

		document.addEventListener('keydown', handleEscClick);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscClick);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isMenuOpen, formRef]);

	const formStyles = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen,
	});

	function handleSubmitForm(e: FormEvent) {
		props.submitForm(e);
		setIsMenuOpen(false);
	}

	return (
		<>
			<ArrowButton
				handle={() => setIsMenuOpen((prev) => !prev)}
				open={isMenuOpen}
			/>
			<aside className={formStyles}>
				<form
					className={styles.form}
					onSubmit={(e) => handleSubmitForm(e)}
					ref={formRef}>
					<Text as='h1' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={props.formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) =>
							props.setFormState({
								...props.formState,
								fontFamilyOption: selected,
							})
						}
					/>
					<RadioGroup
						title='Размер'
						options={fontSizeOptions}
						selected={props.formState.fontSizeOption}
						name='fontsize'
						onChange={(selected) =>
							props.setFormState({
								...props.formState,
								fontSizeOption: selected,
							})
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={props.formState.fontColor}
						onChange={(selected) =>
							props.setFormState({ ...props.formState, fontColor: selected })
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={props.formState.backgroundColor}
						title='Цвет фона'
						onChange={(selected) =>
							props.setFormState({
								...props.formState,
								backgroundColor: selected,
							})
						}
					/>
					<Select
						options={contentWidthArr}
						selected={props.formState.contentWidth}
						title='Ширина контента'
						onChange={(selected) =>
							props.setFormState({ ...props.formState, contentWidth: selected })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={props.resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
