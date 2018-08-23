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
		// var command = "Get-ADComputer -Filter { OperatingSystem -NotLike '*Server*' }";
		// command += "-Properties Name, OperatingSystem, createTimeStamp,SamAccountName ";
		// command += "| Select Name, OperatingSystem, SamAccountName, createTimeStamp ";
		// command += "| Where {$_.createTimeStamp -lt (Get-Date).AddDays(-"+days+")};";
		// var spawn = require("child_process").spawn,child;
		// child = spawn("powershell.exe",[command]);
		// child.stdout.on("data",function(data){
		// console.log(data.toString());
		// return data.toString();
		// });
		return criteria.toString() + " " + days.toString();
	}
}

// export model object
module.exports = model;