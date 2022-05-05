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

