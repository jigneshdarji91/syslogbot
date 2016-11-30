var AWS = require('aws-sdk');
var fs = require("fs");

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

//setting the region
AWS.config.update({region: 'us-west-2'});

var ec2 = new AWS.EC2();

var inst;

var params = {
  ImageId: 'ami-d732f0b7', 
  InstanceType: 't2.micro',
  MinCount: 1, MaxCount: 1,
  KeyName: "syslogbot"
};

console.log('AWS')

ec2.runInstances(params, function(error, data) {
   if(error) { console.log("Could not create instance", error); return; }
   var instanceId = data.Instances[0].InstanceId;
   console.log("Created instance");
  
  // Add tags to the instance
   params = {Resources: [instanceId], Tags: [
      {Key: 'Name', Value: 'webserver'}
   ]};
   ec2.createTags(params, function(err) {
      //console.log("Tagging instance", err ? "failure" : "success");
   });

   inst = {InstanceIds:[instanceId]};
});

setTimeout(function(){
ec2.describeInstances(inst, function(error, data) {
  if (error) {
    console.log(error); // an error occurred
  } else {
     //console.log(data.Reservations[0].Instances[0]); // request succeeded
     if(data.Reservations[0].Instances[0].PublicIpAddress){
         var ipAddress = data.Reservations[0].Instances[0].PublicIpAddress; 
         fs.writeFile("inventory", "zookeepr ansible_ssh_host=" + ipAddress + " ansible_ssh_user=ec2-user ansible_ssh_private_key_file=syslogbot.pem" + "\n")       
     }
  }
});
}, 10000);