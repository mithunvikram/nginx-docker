![Logo](https://github.com/mithunvikram/nginx-docker/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Nginx with Kubernetes<br/>
   In here we will see how to containerized Nginx is setuped on Top of a Kubernetes Cluster.
   
# Content
1. [Prerequisites](#prerequisites)
1. [Kubernetes Setup](#kubernetes-setup)
1. [Nginx](#nginx)

# Prerequisites
1. [Docker](https://docs.docker.com/install/)<br/>
1. [Virtual Machine](https://www.virtualbox.org/wiki/Downloads)<br/>
1. [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)<br/>
1. [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/)<br/>

# Kubernetes Setup
The Kubernetes is an open source containers orchestration tool,i.e ability to deploy, scale, and operate with multiple containers from one place.

### Setting up Kubernetes:<br/>
  To run Kubernetes first you need to setup a VM usng the following command
   
    $ sudo apt install virtualbox virtualbox-ext-pack 
            
  After this need to install Minikube which runs Kubernetes in your local machine.
 
    $ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.31.0/minikube-linux-amd64 && chmod +x  minikube && sudo cp minikube /usr/local/bin/ && rm minikube
    $ minikube start
            
 Once your setuped with minikube need to install kubectl which is the Kubernetes CLI:

    $ sudo apt-get update && sudo apt-get install -y apt-transport-https
    $ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    $ echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
    $ sudo apt-get update
    $ sudo apt-get install -y kubectl

 Thats it! Now you have setuped Kubernetes.
 
  # Nginx Setup<br/>
   Create a [Dockerfile](https://github.com/mithunvikram/nginx-docker/blob/master/Dockerfile) for nginx and build the image.The first command enters the into the minikube VM.
   
    $ eval $(minikube docker-env)
    $ docker build -t gep/nginx-image:1.0 .
    
  As we already have the Kubernetes cluster in place and the Nginx image, you can deploy this image on top of the cluster
  
  Kubernetes deployment is presented in a YAML format text file with all the configuration params that might be needed to run   your application.
  
  Create a [nginx-deployment.yaml](https://github.com/mithunvikram/nginx-docker/blob/master/docs/nginx-deployment.yaml) file, Let’s install the just created deployment into our Kubernetes cluster by using the specified command:
  
     $ kubectl apply -f nginx-deployment.yaml
     
  In addition to pod creation via deployment, we need to create the Nginx service. The reason behind this is simple. To       interact with a pod inside the Kubernetes cluster   
  
  Create a [nginx-service.yaml](https://github.com/mithunvikram/nginx-docker/blob/master/docs/nginx-service.yaml) file,  you can run it inside the Kubernetes container by using this command:
      
     $ kubectl create -f nginx-service.yaml
     
  Now we can open the Minikube Dashboard using:
     
     $ minikube dashboard
  you can able to see browser opens with the minikube Kubernetes Dashboard with Jenkins Pod.  
  
  ![Image1](https://github.com/TharaniRajan/Jenkins-Docker/blob/master/docs/Kubernetes_dash.png?raw=true"Image1")
  
 
 Now to open the Nginx that is setuped using kubernetes
  find the services in kubernetes using command:
  
     $ kubectl get service
     
   you will find the jenkins service that you have created, get the port number in which the service is running
   
   ![Image2](https://github.com/TharaniRajan/Jenkins-Docker/blob/master/docs/kub-service.png?raw=true"Image2")
   
 Next to get IP of the Kubernetes cluster using:
 
      $ minikube ip
 
 Thats it! now you got the IP and Port of the Kubernetes cluster in which the Nginx is      running(example:http://192.168.99.100:30886):
 If you open this in browser you will see the jenkins:
                             
   ![Image3](https://github.com/TharaniRajan/Jenkins-Docker/blob/master/docs/kub_jenkins.png?raw=true"Image3")
