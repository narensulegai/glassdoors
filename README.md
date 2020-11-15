# Glassdoor
Install kafka on Mac https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

Install Kafka client https://github.com/edenhill/kafkacat

Use free hosted kafka server at https://customer.cloudkarafka.com/instance/create?plan=ducky

Use free hosted mongodb server https://www.mongodb.com/cloud/atlas/register

All config environment variables are defined at `Backend/.env` and `Frontend/.env`
### Run Kafka server

```
cd Backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/glassdoor npm run kafka
```

### Run node server
```
cd Backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/glassdoor npm start
```

### Run frontend server
```
cd Frontend && npm start
```

### Frontend build
```
cd Frontend && docker build -t glassdoor-frontend . && docker run -p 3000:80 glassdoor-frontend:latest
```

### Backend build
```
cd Backend && docker build -t glassdoor-backend . && docker run -p 5000:5000 -e MONGODB_CONNECTION=mongodb+srv://<atlas user>:<password>@<cluster>.mongodb.net/glassdoor glassdoor-backend:latest
```
### Deploy commands
```
cd Frontend && rm -rf build/ && REACT_APP_API_URL= npm run build && docker build -t narensj/glassdoor-frontend . && docker push narensj/glassdoor-frontend

minikube delete
minikube start --driver=virtualbox
minikube addons enable ingress
minikube dashboard
kubectl create namespace glassdoor
kubectl delete all --all -n glassdoor && kubectl delete ingress glassdoor-ingress
kubectl config set-context --current --namespace=glassdoor
kubectl apply -f kube/main.yml
minikube service frontend-service -n glassdoor #minikube service list
```
