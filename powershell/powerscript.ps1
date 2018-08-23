$Days = -90
Get-ADUser -properties * -filter {(lastlogondate -notlike "*" -OR lastlogondate -le $Days) -AND (passwordlastset -le $Days) -AND (enabled -eq $True) -and (PasswordNeverExpires -eq $false) -and (whencreated -le $Days)} | select-object name, SAMaccountname, passwordExpired, PasswordNeverExpires, logoncount, whenCreated, lastlogondate, PasswordLastSet

$Days = -90
Get-ADComputer -Filter { OperatingSystem -NotLike '*Server*' } -Properties Name, OperatingSystem, createTimeStamp,SamAccountName | Select Name, OperatingSystem, SamAccountName, createTimeStamp | Where {$_.createTimeStamp -lt (Get-Date).AddDays($Days)}

$Days = -90
Get-ADComputer -Filter { OperatingSystem -Like '*Server*' } -Properties Name, OperatingSystem, createTimeStamp,SamAccountName | Select Name, OperatingSystem, SamAccountName, createTimeStamp | Where {$_.createTimeStamp -lt (Get-Date).AddDays($Days)}