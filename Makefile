topics:
	rpk topic create chat-room
	rpk topic list

setup:
	npm init
	npm i -D typescript
	npm i -D @types/node
	npm i kafkajs
	npm i uuid
	npm i -D @types/uuid
	tsc --init
run:
	tsc
	node src/index.js

docker-build:
	docker build -t lalyos/kcat .

docker-push: docker-build
	docker push lalyos/kcat
