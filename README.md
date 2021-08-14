# backend-api

docker-compose -f dev_docker_compose.yml up --build -d

docker exec -it python-backend-api_backend-api_1 bash.

mysql -u test -p -h host --ssl-ca=server-ca.pem --ssl-cert=client-cert.pem --ssl-key=client-key.pem
