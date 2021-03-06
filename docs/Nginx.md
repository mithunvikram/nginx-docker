![Logo](https://github.com/mithunvikram/nginx-docker/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Docker With Nginx<br/>
   Here we will see how to containerize Nginx in Docker to deploy an web application.
   
# Content
1. [Prerequisites](#prerequisites)
1. [Dockerfile](https://github.com/mithunvikram/nginx-docker/blob/master/Dockerfile)
1. [Docker Compose File](https://github.com/mithunvikram/nginx-docker/blob/master/docker-compose.yml)

# Prerequisites
1. [Install docker](https://docs.docker.com/install/)<br/>
1. [Install docker compose](https://docs.docker.com/compose/install/)

### Setup Nginx with Docker:<br/>
  Here we will see how to containerize nginx with docker. Nginx is used for load balancing and for deployment purpose. 
  
  To start nginx in docker and deploy your angular application you need to clone the code from this repo because we have created a folder as "dist" where you need to put your artifacts inside the dist folder so when you run the docker-compose.yml file it will look into dist folder.This dist folder is your local volume.
  
  Once you have added the artifacts inside the dist you need to run the [docker-compose.yml](https://github.com/mithunvikram/nginx-docker/blob/master/docker-compose.yml) and [Dockerfile](https://github.com/mithunvikram/nginx-docker/blob/master/Dockerfile) by giving this command
  
      docker-compose up --build -d
      
 ![compose](https://github.com/mithunvikram/nginx-docker/blob/master/docs/image3.png?raw=true"compose")     
      
  Once that is done you will be able to see that a container has been created by giving this command
  
      docker ps -a
      
  ![container](https://github.com/mithunvikram/nginx-docker/blob/master/docs/image4.png?raw=true"container")
         
  in there you will be able to see that the container is created.
  
  Once the container is up you can connect by pointing the port number and you will be see the angular application which you have added in application in the browser.And if any change in application just replace existing artifacts with newly created artifacts in dist folder and just need to run this command,
  
      docker-compose up --build -d 
      
   and the project will get build by itself and you changes will be seen in the browser.
   
   ![browser](https://github.com/mithunvikram/nginx-docker/blob/master/docs/image.png?raw=true"browser") 
   
### Nginx Config:<br/>
  For setting the path of the application is been done inside the default.conf file inside the nginx_config folder. In there we have mentioned the port which it needs to listen and the location for the index.html file of your angular application.
  
      server {

      listen 80;

      sendfile on;

      default_type application/octet-stream;

      gzip on;
      gzip_http_version 1.1;
      gzip_disable      "MSIE [1-6]\.";
      gzip_min_length   256;
      gzip_vary         on;
      gzip_proxied      expired no-cache no-store private auth;
      gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml         application/xml application/xml+rss text/javascript;
      gzip_comp_level   9;

      root /usr/share/nginx/html;
      index index.html index.htm;
      
      location / {
      try_files $uri $uri/ /index.html;
      }

     }
         
