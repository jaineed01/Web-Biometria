help:
	@echo 
	@echo make composeup
	@echo make entrar_nodecito
	@echo make composedown
	@echo 
	@echo make info
	@echo 
	@echo make clean
	@echo 

info:
	clear
	@echo "\n\n---- images ------"
	docker images
	@echo "\n\n---- containers ------"
	docker ps -a
	@echo "\n\n---- networks ------"
	docker network ls

# .............................................
# Kubernetes
# .............................................
k8info:
	kubectl get pods,deployments,services,endpoints -o wide

k8infoaplicacioncita:
	kubectl describe pods aplicacioncita

k8logs:
	kubectl logs deployment.apps/aplicacioncita nodecito -f

k8up:
	kubectl apply -f k8aplicacioncita.yaml

k8down:
	kubectl delete -f k8aplicacioncita.yaml

k8forward:
	@echo kubectl port-forward deployment.apps/aplicacioncita 8080:8080

k8login:
	kubectl exec --stdin --tty  deployment.apps/aplicacioncita -c nodecito  -- /bin/bash

k8cp:
	@echo kubectl cp hola.txt aplicacioncita-d98b88cf5-r4l5j:/home/node -c nodecito

# .............................................
# Docker Compose
# .............................................

composeup:
	docker-compose up

composedown:
	docker-compose down

up: redecita marieta nodecito info

# .............................................
# Docker 
# .............................................
clean: stopall_ rmcont_ rmimg_ rmred info

redecita:
	docker network create redecita || true

rmred:
	docker network rm redecita || true

nodecito_img:
	docker build --tag nodecito_img --file Dockerfile.nodecito .

nodecito: nodecito_img  redecita
	docker run --network redecita -p 8080:8080 --interactive --detach --name nodecito  nodecito_img  || true

entrar_nodecito:
	@echo
	@echo node mainTest.js
	@echo
	docker exec -it nodecito bash

marieta_img:
	docker build --tag marieta_img --file Dockerfile.marieta .

marieta: marieta_img redecita
	docker run --network redecita -p 3306:3306 --detach --name marieta --env MARIADB_ROOT_PASSWORD=1234 marieta_img || true

entrar_marieta:
	@echo
	@echo mariadb -u root -p 
	@echo 	use PROBANDOKV;
	@echo		select * from key_value;
	@echo
	docker exec -it marieta bash

stopall: stopall_ info

stopall_:
	docker stop `docker ps -aq` || true

rmcont: stopall_ rmcont_ info

rmcont_:
	docker rm `docker ps -aq` || true

rmimg: rmimg_ info

rmimg_:
	docker rmi nodecito_img || true
	docker rmi marieta_img || true
	docker rmi docker-intro-nodecito || true
	docker rmi docker-intro-marieta || true