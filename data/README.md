# MYSQL Setup

## BASIC MYSQL Setup: 
- Update the package index
```
sudo apt-get update
```
- Install MySQL Server

```
sudo apt-get install mysql-server
```

- Configure MySQL Server
```
sudo mysql_secure_installation
```

## Configuring MySQL server for remote connection

- Comment the following line in the following file : /etc/mysql/my.cnf 
```
bind-address 127.0.0.1
```

- Execute following SQL query 
```
grant all privileges on *.* to 'root'@'%' with grant option;
```

## Connecting to the Remote Mysql Server

- Use following command to connect to the mysql server remotely : 
```
mysql -u root -h public_ip_address
```
