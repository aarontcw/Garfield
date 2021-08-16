# backend-api

docker-compose -f dev_docker_compose.yml up --build -d

docker exec -it garfield_backend-api_1 bash

mysql -u user -p -h 34.87.154.208 --ssl-ca=server-ca.pem --ssl-cert=client-cert.pem --ssl-key=client-key.pem

# frontend

https://dzone.com/articles/react-apps-firebase
npm run build
firebase deploy
