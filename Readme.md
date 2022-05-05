# How to run the application 
#### Execute the below commands in the same order 
```
   docker-compose up -d
   docker-compose exec api npm i 
   docker-compose exec redis redis-cli config set notify-keyspace-events KEA

```

#### Check logs
```
    docker-compose logs -f api
```

#### Access 
```
curl localhost:3000
```


### Key API's to test are documented below. Other crud apis are ignored for now. postman_collection.json in repo has the same api's and can be imported 

Rest / Clean the setup 
```
curl --location --request POST 'localhost:3000/reset'
```


Setup  initial data  
```
curl --location --request POST 'localhost:3000/setup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "noOfFloors": 3,
    "noOfMainCorridors": 2,
    "noOfSubCorridors": 2
}'

```


Reset Setup to initialise again
```
curl --location --request GET 'localhost:3000/monitor'
```


Get list of sensors and ares 
```
curl --location --request GET 'localhost:3000/SIA/'
```

Send signal from one of the sensor 
```
curl --location --request POST 'localhost:3000/sensor/Iw3762LRi/signal'
```







