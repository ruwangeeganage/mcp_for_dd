run:
	npm run start

build:
	npm run build
	chmod +x dist/index.js

start:
	npm run build
	chmod +x dist/index.js
	npm start