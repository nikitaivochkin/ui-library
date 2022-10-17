build:
	npm run rollup

test:
	npm run test -- $(args)

storybook:
	npm run storybook

lint:
	npx eslint . --ext js,jsx,ts,tsx