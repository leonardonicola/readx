variable "igw_name" {
  default = "readx_igw"
  type    = string
}

variable "subnet_name" {
  default = "readx_subnet"
  type    = string
}

variable "rtable_name" {
  default = "readx_rtable"
  type    = string
}

variable "instance_name" {
  default = "readx-instance"
  type    = string
}

variable "main_region" {
  default = "sa-east-1"
  type    = string
}

variable "vpc_name" {
  default = "readx-vpc"
  type    = string
}

variable "sg_name" {
  default = "readx-sg"
  type    = string
}
