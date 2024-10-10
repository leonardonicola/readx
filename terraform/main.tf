provider "aws" {
  region = var.main_region
}

# The vpc itself
resource "aws_vpc" "selected" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = var.vpc_name
  }
}

# Public subnet
# Public because we have a route table association we 
# bind a internet gateway in it
resource "aws_subnet" "subnet" {
  vpc_id            = aws_vpc.selected.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.main_region}a"
  tags = {
    "Name" = var.subnet_name
  }
}

# Internet gateway for internet access
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.selected.id
  tags = {
    Name = var.igw_name
  }
}

# Route table to public subnet and internet gateway bridge
resource "aws_route_table" "rtable" {
  vpc_id = aws_vpc.selected.id

  # Basically intercepts all matching requests to a destination (CIDR),
  # and redirect it to the provided target (in this block, the IGW)
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = var.rtable_name
  }
}

resource "aws_route_table_association" "rtable_assoc" {
  subnet_id      = aws_subnet.subnet.id
  route_table_id = aws_route_table.rtable.id
}

resource "aws_security_group" "sg" {
  name   = var.sg_name
  vpc_id = aws_vpc.selected.id

  # SSH
  ingress {
    to_port   = 22
    from_port = 22
    protocol  = "tcp"
    # Allow any IP to try SSH into the instance
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    to_port     = 80
    from_port   = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    to_port     = 443
    from_port   = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Internet
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Allow instance to connect with any IP in the internet 
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_instance" "ec2" {
  # Amazon Linux 2 2023
  ami                         = "ami-0fd8b11b89c97edaf"
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  # Public subnet btw
  subnet_id              = aws_subnet.subnet.id
  vpc_security_group_ids = [aws_security_group.sg.id]

  tags = {
    "Name" = var.instance_name
  }

  # Simple update upgrade
  user_data = <<-EOF
              #!/bin/bash
              set -ex
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              EOF

}
