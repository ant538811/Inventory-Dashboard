$dcserver = 0
$standard = 0
$number = 0
$OSarray = Get-ADComputer -Filter {OperatingSystem -Like "*Server*"} -Property *| Select-Object -Expand OperatingSystem

$OUarray = Get-ADComputer -Filter {OperatingSystem -Like "*Server*"} -Property * | ForEach-Object{

     $dn = $_.DistinguishedName.Split(',')

     New-Object PSObject -Property @{
         " " = $dn[$dn.length..1] -notlike 'dc=*' -join ','
     }

}

$CNarray = Get-ADComputer -Filter {OperatingSystem -Like "*Server*"} | Select-Object -Expand name

#The above blocks are used to start counts and get the data needed from the Active Directory



write-host("Datacenter licensed servers: ")
write-host("")
write-host("")


for ($i=0; $i -lt $osarray.count; $i++) {
	if ($osarray[$i].contains("Datacenter")){
		if ($cnarray[$i].contains("HV")){
		$dcserver++
		write-host("$($CNarray[$i])	$($osarray[$i])")
		}
	}
	if (-not ($osarray[$i].contains("Datacenter"))){
		if (-not ($cnarray[$i].contains("COR01"))){
			if (-not ($cnarray[$i].contains("SKM"))){
				if (-not ($cnarray[$i].contains("SA01"))){
					if (-not ($OUarray[$i] -like "*OU=Servers - To Be Sorted*")){
						if ($cnarray[$i].contains("HV")){
							$standard++
						}
						elseif (-not($cnarray[$i].contains("HV"))){
							$standard+= 0.5	
						}
					}
				}
			}
		}
	}
}
#The above block will take into account Datacenter and Standard licenses, excluding certain CN's from the count




write-host("")
write-host("")
write-host("OU's and standard licenses consumed")
write-host("")
write-host("")


$unqou = @()
for ($i=0; $i -lt $ouarray.count; $i++){
	$unqou += $ouarray[$i]
	#$unqou[$i]
}
$unqou = [string]::Join("", $unqou)
$unqou = $unqou.split("}@{").split(",")
$unqou = $unqou.where({$_ -ne ""})
#$unqou = $unqou.where({$_ -ne " "})
$unqou = $unqou | select -uniq
$unqou = $unqou | Sort-Object
#This entire block is used for getting a unique set of OU's and sorting them



for ($x=0; $x-lt $unqou.count; $x++){
	$oucount = 0
	for ($i=0; $i-lt $osarray.count; $i++){
		if(-not $osarray[$i].contains("Datacenter")){
			if (-not ($cnarray[$i].contains("COR01"))){
				if (-not ($cnarray[$i].contains("SKM"))){
					if (-not ($cnarray[$i].contains("SA01"))){
						if (-not ($OUarray[$i] -like "*OU=Servers - To Be Sorted*")){
								if($ouarray[$i] -match $unqou[$x]){
									$oucount++
							}
						}
					}
				}
			}
		}
	}	
	write-host($($unqou[$x]) + ": " + $oucount)
}
#This block prints a line with a count of each OU; only CN's partaking in standard licenses are counted here

write-host ("There are " + $($osarray.count) + " servers total")
write-host ("There are currently "+ [math]::floor($standard) + " standard licenses being consumed.")
write-host ("")