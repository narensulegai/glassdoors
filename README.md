# Glassdoor
Install kafka on Mac https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

Install Kafka client https://github.com/edenhill/kafkacat

Use free hosted kafka server at https://customer.cloudkarafka.com/instance/create?plan=ducky

Use free hosted mongodb server https://www.mongodb.com/cloud/atlas/register

All config environment variables are defined at `Backend/.env` and `Frontend/.env`
### Run Kafka server

```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/glassdoor npm run kafka
```

### Run node server
```
cd backend && KAFKA_BROKERS=localhost:9092 MONGODB_CONNECTION=mongodb://localhost/glassdoor npm start
```

### Run frontend server
```
cd frontend && npm start
```

###Frontend
```
docker build -t glassdoor-frontend . && docker run -p 3000:80 glassdoor-frontend:latest
```

