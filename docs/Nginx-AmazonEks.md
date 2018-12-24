![Logo](https://github.com/mithunvikram/nginx-docker/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Nginx with Amazon Eks<br/>
   In here we will see how to containerized Nginx is setup on Top of a Kubernetes Cluster.
   
# Content
1. [Prerequisites](#prerequisites)
1. [Kubernetes Setup](#kubernetes-setup)
1. [Nginx](#nginx-setup)

# Prerequisites
1. [Docker](https://docs.docker.com/install/)<br/>
1. [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/)<br/>
1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)<br/>
1. [Create your Amazon EKS Service Role]

Create your Amazon EKS Service Role
To create your Amazon EKS service role in the IAM console,

1.Open the IAM console at https://console.aws.amazon.com/iam/. <br/>
2.Choose Roles, then Create role.<br/>
3.Choose EKS from the list of services, then Allows Amazon EKS to manage your clusters on your behalf for your use case, then     Next: Permissions.<br/>
4.Choose Next: Review.<br/>
5.For Role name, enter a unique name for your role, such as eksServiceRole, then choose Create role.<br/>


