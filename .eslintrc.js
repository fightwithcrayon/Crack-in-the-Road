const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
	env: {
		browser: true,
		es6: true,
		'jest/globals': true,
		node: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
	globals: {
		WEBPACK_BUILD_VERSION: 'readonly',
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 9,
		sourceType: 'module',
	},
	plugins: ['babel', 'jest', 'react-hooks', 'prettier'],
	rules: {
		'babel/semi': ERROR,
		'brace-style': [ERROR, '1tbs'],
		curly: [ERROR, 'all'],
		'import/no-extraneous-dependencies': [
			ERROR,
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		'import/order': OFF,
		'jsx-a11y/alt-text': OFF,
		'jsx-a11y/control-has-associated-label': OFF,
		'jsx-a11y/html-has-lang': OFF,
		'jsx-a11y/iframe-has-title': OFF,
		'jsx-a11y/media-has-caption': OFF,
		'jsx-a11y/no-noninteractive-tabindex': OFF,
		'max-len': [
			ERROR,
			{
				code: 120,
				ignoreTemplateLiterals: true,
				tabWidth: 4,
			},
		],
		'no-console': OFF,
		'no-tabs': OFF,
		'object-property-newline': [
			ERROR,
			{
				allowAllPropertiesOnSameLine: false,
			},
		],
		'padding-line-between-statements': [
			ERROR,
			{
				blankLine: 'always',
				next: '*',
				prev: [
					'case',
					'multiline-block-like',
					'multiline-const',
					'multiline-expression',
					'multiline-let',
					'multiline-var',
				],
			},
			{
				blankLine: 'always',
				next: [
					'multiline-block-like',
					'multiline-const',
					'multiline-expression',
					'multiline-let',
					'multiline-var',
					'return',
				],
				prev: '*',
			},
		],
		'prettier/prettier': ERROR,
		'react-hooks/exhaustive-deps': ERROR,
		'react-hooks/rules-of-hooks': ERROR,
		'react/forbid-dom-props': [
			WARN,
			{ forbid: ['onClick' /* , 'className' */] },
		],
		'react/jsx-curly-brace-presence': [
			ERROR,
			{
				children: 'ignore',
				props: 'never',
			},
		],
		'react/jsx-filename-extension': OFF,
		'react/jsx-no-literals': [
			ERROR,
			{
				noStrings: false,
			},
		],
		'react/jsx-props-no-spreading': OFF,
		'react/jsx-sort-default-props': [
			ERROR,
			{
				ignoreCase: false,
			},
		],
		'react/jsx-sort-props': [
			ERROR,
			{
				callbacksLast: false,
				ignoreCase: false,
				noSortAlphabetically: false,
				reservedFirst: false,
				shorthandFirst: false,
				shorthandLast: false,
			},
		],
		'react/no-danger': OFF,
		'react/sort-comp': OFF,
		'react/sort-prop-types': [
			ERROR,
			{
				callbacksLast: false,
				ignoreCase: false,
				requiredFirst: false,
				sortShapeProp: false,
			},
		],
		'react/state-in-constructor': OFF,
		'react/static-property-placement': OFF,
		'sort-imports': [
			ERROR,
			{
				ignoreCase: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
		'sort-keys': [
			ERROR,
			'asc',
			{
				caseSensitive: true,
				natural: false,
			},
		],
	},
	settings: {
		react: {
			pragma: 'React',
			version: '16.3',
		},
	},
};
