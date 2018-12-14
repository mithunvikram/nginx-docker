![Logo](https://github.com/mithunvikram/nginx-docker/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Docker With Nginx<br/>
   In here we will see how to containerize Nginx in Docker with volumes for the purpose of the creating a back up floder to store the data in case if the container gets crashed or deleted.
   
# Content
1. [Prerequisites](#prerequisites)
1. [Docker File]()
1. [Docker compose File]()

# Prerequisites
1. [Install docker](https://docs.docker.com/install/)<br/>
1. [Install docker compose](https://docs.docker.com/compose/install/)

### Setup Nginx with Docker:<br/>
  In here we will see how to containerize nginx with docker. Nginx is used for load balancing and for deployment purpose. 
  
  In here to start nginx in docker and deploy your angular application you need to clone the code from this repo because we have created a folder as application where you need to put you code inside the application so when you run the docker file and docker compose file it will look into application for the code.
  
  Once you have added the code inside the application you need to run the [Docker file](https://github.com/mithunvikram/nginx-docker/blob/master/docs/Dockerfile) and [Docker compose file](https://github.com/mithunvikram/nginx-docker/blob/master/docs/docker-compose.yml) by giving this command
  
      docker-compose up --build -d
      
  Once that is done you will be able to see that a container has been created by giving this command
  
         docker ps -a
         
  in there you will be able to see that the container is created.
  
  Once the container is up you can connect by pointing the port number and you will be see the angular application which you have added in application in the browser. And if any change has been made to the component you just need to run the 
  
      docker compose up --build -d 
      
   and the project will get build by itself and you changes will be seen in the browser.
  
         
