[Amazon Elastic Compute Cloud (EC2)](https://aws.amazon.com/) is one of the most popular cloud computing platforms, with datacenters in the Northern Virginia, Northern California, Oregon, Sao Paulo, Ireland, Sydney, Tokyo and Singapore.

<em>Due to the large amount of configurations available on EC2, we are currently not able to provide default values for the image. Refer to both the [EC2 Instance Types Matrix](https://aws.amazon.com/ec2/instance-types/) and the [official Ubuntu AMIs page](http://cloud-images.ubuntu.com/releases/14.04.1/release/) to define the AMI that will work for your location and instance size.</em>

<em>Don't have an Amazon EC2 account yet? <a href='https://aws.amazon.com/' target='_blank'>Sign up for an account</a>.</em>

## Example

The following [node file](http://docs.devo.ps/manual/nodes/#node-file) will create a micro instance of first generation (`size: t1.micro`) in the Northern Virginia datacenter (`location: us-east-1`) with a 64-bit Ubuntu 14.04.1 LTS, EBS-backed AMI (`image: ami-d2ff23ba`, see the [official Ubuntu AMIs page](http://cloud-images.ubuntu.com/releases/14.04.1/release/)):


    id: ec2_server
    name: EC2 server
    type: server

    providers:
      name: ec2
      size: t1.micro
      location: us-east-1
      image: ami-d2ff23ba
