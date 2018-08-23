// var exec = require('child_process').exec;
// var child;
// var command = 'Powershell import-module ActiveDirectory';
// command += '$Days = (get-date).adddays(-90);';
// command += 'Get-ADUser -properties * -filter {(lastlogondate -notlike "*" -OR lastlogondate -le $Days) -AND (passwordlastset -le $Days) -AND (enabled -eq $True) -and (PasswordNeverExpires -eq $false) -and (whencreated -le $Days)}';
// command += '| select-object name, SAMaccountname, passwordExpired, PasswordNeverExpires, logoncount, whenCreated, lastlogondate, PasswordLastSet';
// child = exec(command,
//    function (error, stdout, stderr) {
//       console.log('stdout: ' + stdout);
//       console.log('stderr: ' + stderr);
//       if (error !== null) {
//           console.log('exec error: ' + error);
//       }
//    });
// var command = "$Days = (get-date).adddays(-90)";
// command += "Get-ADComputer -Filter { OperatingSystem -NotLike '*Server*' }";
// command += "-Properties Name, OperatingSystem, createTimeStamp,SamAccountName ";
// command += "| Select Name, OperatingSystem, SamAccountName, createTimeStamp ";
// command += "| Where {$_.createTimeStamp -lt (Get-Date).AddDays($Days)};";
var days = 90;
var command = "Get-ADComputer -Filter { OperatingSystem -NotLike '*Server*' }";
command += "-Properties Name, OperatingSystem, createTimeStamp,SamAccountName ";
command += "| Select Name, OperatingSystem, SamAccountName, createTimeStamp ";
command += "| Where {$_.createTimeStamp -lt (Get-Date).AddDays(-"+days+")};";

var spawn = require("child_process").spawn,child;
child = spawn("powershell.exe",[command]);
child.stdout.on("data",function(data){
	console.log(data.toString());
});