import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, FormEvent, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [appState, setAppState] = useState(defaultArticleState);

	function handleSubmitForm(e: FormEvent) {
		e.preventDefault();
		setAppState({
			...appState,
			fontFamilyOption: formState.fontFamilyOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
			fontSizeOption: formState.fontSizeOption,
		});
	}

	function handleResetForm() {
		setFormState(defaultArticleState);
		setAppState(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				submitForm={handleSubmitForm}
				resetForm={handleResetForm}
				formState={formState}
				appState={appState}
				setFormState={setFormState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
