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
      3.Choose EKS from the list of services, then Allows Amazon EKS to manage your clusters on your behalf for your use case, then Next: Permissions.
      4.Choose Next: Review.
      5.For Role name, enter a unique name for your role, such as eksServiceRole, then choose Create role.

# Create your Amazon EKS Cluster VPC
   To create your cluster VPC 
   
      1.Open the AWS CloudFormation console at https://console.aws.amazon.com/cloudformation.
      2.From the navigation bar, select a Region that supports Amazon EKS.
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
      3.Choose Create stack.
      4.For Choose a template, select Specify an Amazon S3 template URL.
      5.Paste the following URL into the text area and choose Next:
   
    $ https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2018-12-10/amazon-eks-vpc-sample.yaml
    
      6.On the Specify Details page, fill out the parameters accordingly, and then choose Next.
         Stack name: Choose a stack name for your AWS CloudFormation stack. For example, you can call it eks-vpc.
         VpcBlock: Choose a CIDR range for your VPC. You may leave the default value.
         Subnet01Block: Choose a CIDR range for subnet 1. You may leave the default value.
         Subnet02Block: Choose a CIDR range for subnet 2. You may leave the default value.
         Subnet03Block: Choose a CIDR range for subnet 3. You may leave the default value.

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




