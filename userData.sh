#!/bin/bash

# create deployer user without password and set EC2 instance public key as authorized_keys
sudo adduser deployer
sudo mkdir /home/deployer/.ssh
sudo touch /home/deployer/.ssh/authorized_keys
sudo curl http://169.254.169.254/latest/meta-data/public-keys/0/openssh-key | sudo tee -a /home/deployer/.ssh/authorized_keys

sudo chmod 700 /home/deployer/.ssh
sudo chmod 600 /home/deployer/.ssh/authorized_keys
sudo chown deployer /home/deployer/.ssh
sudo chown deployer /home/deployer/.ssh/authorized_keys

sudo yum update -y

# install mc
sudo yum install mc -y 

echo "installing docker..."

sudo amazon-linux-extras install docker -y
sudo service docker start   
sudo docker run hello-world

# add ec2-user to docker group, so it won't need admin privileges to run docker
sudo usermod -a -G docker ec2-user
# add deployer user to docker group, so it won't need admin privileges to run docker
sudo usermod -aG docker deployer

# Make docker auto-start
sudo chkconfig docker on

# Get latest version of docker-compose binary from GitHub:
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# Fix permissions after download:
sudo chmod +x /usr/local/bin/docker-compose

# Verify success:
docker-compose version

# Install git
sudo yum install -y git

# install openssl and generate private key (privatekey.pem) and certificate (server.crt)
# sudo apt-get install -y openssl
openssl req -x509 -newkey rsa:4096 -keyout privatekey.pem -out server.crt -days 10000 -nodes -subj "/C=IE/ST=Leinster/L=Dublin/O=National College of Ireland/OU=School of Computing/CN=ncirl.ie"

sudo cp privatekey.pem /home/ec2-user
sudo cp server.crt /home/ec2-user
sudo chmod 700 /home/ec2-user/privatekey.pem
sudo chmod 700 /home/ec2-user/server.crt
sudo chown ec2-user /home/ec2-user/privatekey.pem
sudo chown ec2-user /home/ec2-user/server.crt

# Enable nginx
sudo amazon-linux-extras enable nginx1

# Install nginx nginx
sudo yum clean metadata
sudo yum -y install nginx

# Verify nginx    
nginx -v

# configure nginx to start automatically on system boot 
sudo chkconfig nginx on

# Install dotnet runtime
# wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
# sudo chmod +x ./dotnet-install.sh
# sudo ./dotnet-install.sh --version 6.0.0 --runtime dotnet

# Set environment variables system-wide
# export DOTNET_ROOT=$HOME/.dotnet
# export PATH=$PATH:$HOME/.dotnet:$HOME/.dotnet/tools

#Reboot to verify it all loads fine on its own.
sudo reboot