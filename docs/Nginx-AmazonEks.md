![Logo](https://github.com/mithunvikram/nginx-docker/blob/master/docs/GeppettoIcon.png?raw=true"Logo")

# Nginx with Amazon Eks<br/>
   In here we will see how to setup Nginx in Amazon elastic container service(EKS) for Kubernetes.
   
# Content
1. [Prerequisites](#prerequisites)
1. [Kubernetes Setup in AWS](#kubernetes-setup-in-aws)
1. [Nginx in Amazon EKS](#nginx-in-amazon-eks)

# Prerequisites
1. [Docker](https://docs.docker.com/install/)<br/>
1. [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/)<br/>
1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)<br/>

# Kubernetes setup in AWS

  Here we will see how to setup kubernetes in aws

# Follow the steps in this link to create Amazon EKS Service role, aws-iam authenticator and AWS config,
 
    $ https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html


# Create your Amazon EKS Cluster VPC
   To create your cluster VPC 
   
   1.Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation.
   
   2.From the navigation bar, select a Region that supports Amazon EKS.
   
   3.Choose Create stack.
   
   4.For Choose a template, select Specify an Amazon S3 template URL.
   
   5.Paste the following URL into the text area and choose Next:
   
     $ https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/amazon-eks-vpc-sample.yaml
    
   6.On the Specify Details page, fill out the parameters, and then choose Next.

   7.(Optional) On the Options page, tag your stack resources. Choose Next.
   
   8.On the Review page, choose Create.
   
   9.When your stack is created, select it in the console and choose Outputs.
   
   10.Record the SecurityGroups value for the security group that was created. You need this when you create your EKS cluster; this security group is applied to the cross-account elastic network interfaces that are created in your subnets that allow the Amazon EKS control plane to communicate with your worker nodes.
   
   11.Record the VpcId for the subnets that were created. You need this when you launch your worker node group template.
   
   12.Record the SubnetIds for the subnets that were created. You need this when you create your EKS cluster; these are the subnets that your worker nodes are launched into.
       
# To install kubectl for Amazon EKS

   You have multiple options to download and install kubectl for your operating system.

   The kubectl binary is available in many operating system package managers, and this option is often much easier than a manual download and install process. You can follow the instructions for your specific operating system or package manager in the Kubernetes documentation to install.
   
   Amazon EKS also vends kubectl binaries that you can use that are identical to the upstream kubectl binaries with the same version. To install the Amazon EKS-vended binary for your operating system, see Installing kubectl.
   
# Step 1: Create Your Amazon EKS Cluster

   1.Open the Amazon EKS console at https://console.aws.amazon.com/eks/home#/clusters.
   
   2.Choose Create cluster.
   
   3.On the Create cluster page, fill in the following fields and then choose Create:

      Cluster name: A unique name for your cluster.
      Kubernetes version: The version of Kubernetes to use for your cluster. By default, the latest available version is selected.
      Role ARN: Select the IAM role that you created with Create your Amazon EKS Service Role.
      VPC: The VPC you created with Create your Amazon EKS Cluster VPC. You can find the name of your VPC in the drop-down list.
      Subnets: The SubnetIds values (comma-separated) from the AWS CloudFormation output that you generated with Create your Amazon EKS Cluster VPC. By default, the available subnets in the above VPC are preselected.
      Security Groups: The SecurityGroups value from the AWS CloudFormation output that you generated with Create your Amazon EKS Cluster VPC. This security group has ControlPlaneSecurityGroup in the drop-down name.
      
   4.On the Clusters page, choose the name of your newly created cluster to view the cluster information.
   
   5.The Status field shows CREATING until the cluster provisioning process completes.
   
 # To create your cluster with the AWS CLI

   Create your cluster with the following command. Substitute your cluster name, the Amazon Resource Name (ARN) of your Amazon EKS service role that you created in Create your Amazon EKS Service Role, and the subnet and security group IDs for the VPC that you created in Create your Amazon EKS Cluster VPC.
     
    aws eks create-cluster --name devel --role-arn arn:aws:iam::111122223333:role/eks-service-role-AWSServiceRoleForAmazonEKS-EXAMPLEBKZRQR --resources-vpc-config subnetIds=subnet-a9189fe2,subnet-50432629,securityGroupIds=sg-f5c54184
    
  # Step 2: Configure kubectl for Amazon EKS
  
  1.Use the AWS CLI update-kubeconfig command to create or update your kubeconfig for your cluster.

  By default, the resulting configuration file is created at the default kubeconfig path (.kube/config) in your home directory or merged with an existing kubeconfig at that location. You can specify another path with the --kubeconfig option.

You can specify an IAM role ARN with the --role-arn option to use for authentication when you issue kubectl commands. Otherwise, the IAM entity in your default AWS CLI or SDK credential chain is used. You can view your default AWS CLI or SDK identity by running the aws sts get-caller-identity command.

For more information, see the help page with the aws eks update-kubeconfig help command or see update-kubeconfig in the AWS CLI Command Reference.

     aws eks update-kubeconfig --name cluster_name
     
  2.Test your configuration.
  
     kubectl get svc
     
   # Step 3: Launch and Configure Amazon EKS Worker Nodes
   
   Now that your VPC and Kubernetes control plane are created, you can launch and configure your worker nodes.

To launch your worker nodes

   1.Wait for your cluster status to show as ACTIVE. If you launch your worker nodes before the cluster is active, the worker nodes will fail to register with the cluster and you will have to relaunch them.

   2.Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation.

   3.From the navigation bar, select a Region that supports Amazon EKS
   
   4.Choose Create stack.

   5.For Choose a template, select Specify an Amazon S3 template URL.

   6.Paste the following URL into the text area and choose Next
   
    https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/amazon-eks-nodegroup.yaml
    
   7.On the Specify Details page, fill out the following parameters, and choose Next.
   
   8.On the Options page, you can choose to tag your stack resources. Choose Next.

   9.On the Review page, review your information, acknowledge that the stack might create IAM resources, and then choose Create.

   10.When your stack has finished creating, select it in the console and choose the Outputs tab.

   11.Record the NodeInstanceRole for the node group that was created. You need this when you configure your Amazon EKS worker nodes.
   
   # To enable worker nodes to join your cluster
   
   1.Download, edit, and apply the AWS authenticator configuration map:

   a.Download the configuration map.
   
     curl -O https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/aws-auth-cm.yaml

   b.Open the file with your favorite text editor. Replace the <ARN of instance role (not instance profile)> snippet with the NodeInstanceRole value that you recorded in the previous procedure, and save the file.
   
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: aws-auth
      namespace: kube-system
    data:
      mapRoles: |
        - rolearn: <ARN of instance role (not instance profile)>
          username: system:node:{{EC2PrivateDNSName}}
          groups:
            - system:bootstrappers
            - system:nodes
            
   c.Apply the configuration. This command may take a few minutes to finish.
   
      kubectl apply -f aws-auth-cm.yaml
      
   2.Watch the status of your nodes and wait for them to reach the Ready status.
   
      kubectl get nodes --watch
      
      
# Nginx in Amazon Eks
  
   Make sure you have pushed your docker image of nginx with your app in Docker hub.Login to your ec2 instance with pem file through ssh.
    Create a [nginx-deployment.yaml](https://github.com/mithunvikram/nginx-docker/blob/master/docs/nginxeks-service.yaml) file, Let’s install the just created deployment into our Kubernetes cluster by using the specified command:
  
     $ kubectl apply -f nginx-deployment.yaml
     
  In addition to pod creation via deployment, we need to create the Nginx service. The reason behind this is simple. To       interact with a pod inside the Kubernetes cluster   
  
  Create a [nginx-service.yaml](https://github.com/mithunvikram/nginx-docker/blob/master/docs/nginxeks-service.yaml) file,  you can run it inside the Kubernetes container by using this command:
      
     $ kubectl apply -f nginx-service.yaml
     
 Query the services in your cluster and wait until the External IP column for the nginx service is populated.

     $ kubectl get services -o wide

After your external IP address is available, point a web browser to that address at port 80 to view your nginx. For example, http://a7a95c2b9e69711e7b1a3022fdcfdf2e-1985673473.us-west-2.elb.amazonaws.com:80

![Image1](https://github.com/mithunvikram/nginx-docker/blob/master/docs/Selection_007.png?raw=true"Image1")
