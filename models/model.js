// set node dependency
const shell = require('node-powershell');

// create an output variable and ps object
// var alpha = [];
let ps = new shell({
  executionPolicy: 'Bypass',
  noProfile: true
});

// model and methods to export for use by the controller
var model = {

	// runs powershell command but there is a delay between the rendering and the data access because of active directory
	postdata : function(criteria, days){
		// generates the powershell query

		var command = "";
		if (criteria == "Users"){
			command += "Get-ADUser -properties * -filter {(lastlogondate -notlike '*' -OR lastlogondate -le ";
			command += days + ") -AND (passwordlastset -le (Get-Date).AddDays(" + days + ") ) -AND (enabled -eq $True) -and (PasswordNeverExpires -eq $false) -and (whencreated -le (Get-Date).AddDays(" + days + "))} | select-object name, SAMaccountname, passwordExpired, PasswordNeverExpires, logoncount, whenCreated, lastlogondate, PasswordLastSet";
		}
		else if (criteria == "Workstations"){
			command += "Get-ADComputer -Filter { OperatingSystem -NotLike '*Server*' } -Properties Name, OperatingSystem, createTimeStamp,SamAccountName | Select Name, OperatingSystem, SamAccountName, createTimeStamp | Where {$_.createTimeStamp -lt (Get-Date).AddDays(";
			command += days + ")}";
		}
		else if (criteria == "Servers"){
			command += "Get-ADComputer -Filter { OperatingSystem -Like '*Server*' } -Properties Name, OperatingSystem, createTimeStamp,SamAccountName | Select Name, OperatingSystem, SamAccountName, createTimeStamp | Where {$_.createTimeStamp -lt (Get-Date).AddDays(";
			command += days + ")}";
		}
		// return command;

		// runs command through subprocess
		var spawn = require("child_process").spawn,child;
		child = spawn("powershell.exe",[command]);
		child.stdout.on("data",function(data){
		console.log(data.toString()); //comes out as undefined until the active directory is accessed
		return data.toString();
		});

		// runs command through node package
		// ps.addCommand('echo node-powershell');
		// ps.invoke()
		// .then(output => {
  // 		return output;
		// })
		// .catch(err => {
  // 		console.log(err);
  // 		ps.dispose();
		// });

	}
}

// export model object
module.exports = model;