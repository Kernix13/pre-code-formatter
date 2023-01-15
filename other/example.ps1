Write-Host "Testing adding PowerShell scripts to a file"
Write-Host "This is a Visual Studio Code script"
Write-Host get-date

Set-PSDebug -Strict
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

Get-Help
Get-Command
Get-ExecutionPolicy -List
Get-Process
Get-Process | measure VirtualMemorySize -Sum
Get-Service | Where-Object {$_.status -eq "stopped"}
Get-Service | Where-Object {$_.Status -eq “Running”}
Get-Service | Export-CSV c:\service.csv
Get-EventLog -Log "Application"
Get-WinEvent -ListLog *
Get-PSDrive | ConvertTo-Html | Out-File -FilePath PSDrives.html

Clear-Content C:\Temp\TestFile.txt
ConvertTo-SecureString [-String] SomeString

New-EventLog -LogName Troubleshooting_Log -Source FalloutApp
Write-EventLog -log Troubleshooting_Log -source FalloutApp -EntryType Information -eventID 10 -Message "FalloutApp has been successfully installed"

Start-Sleep -Seconds 999

Stop-Process -Name “notepad”