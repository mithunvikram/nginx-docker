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

# Create your Amazon EKS Service Role
To create your Amazon EKS service role in the IAM console,

1.Open the IAM console at https://console.aws.amazon.com/iam/. 
2.Choose Roles, then Create role.
3.Choose EKS from the list of services, then Allows Amazon EKS to manage your clusters on your behalf for your use case, thenNext: Permissions.<br/>
4.Choose Next: Review.<br/>
5.For Role name, enter a unique name for your role, such as eksServiceRole, then choose Create role.<br/>

# Create your Amazon EKS Cluster VPC
To create your cluster VPC 
1.Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation.
1.From the navigation bar, select a Region that supports Amazon EKS.
  Note:
  Amazon EKS is available in the following Regions at this time:
   US West (Oregon) (us-west-2)
   US East (N. Virginia) (us-east-1)
   US East (Ohio) (us-east-2)
   EU (Frankfurt) (eu-central-1)
   EU (Stockholm) (eu-north-1)
   EU (Ireland) (eu-west-1)
   Asia Pacific (Tokyo) (ap-northeast-1)
   Asia Pacific (Singapore) (ap-southeast-1)
   Asia Pacific (Sydney) (ap-southeast-2)
1.Choose Create stack.
1.For Choose a template, select Specify an Amazon S3 template URL.
1.Paste the following URL into the text area and choose Next:
   
    $ https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/amazon-eks-vpc-sample.yaml
    
    


