$files = Get-ChildItem -Filter *.html -Recurse
$ownerHtml = '<p style="opacity: 0.7; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;"><i class="fa-solid fa-user-tie" style="color: var(--secondary-red);"></i><span>Owner: Ravi Singh Dhakre</span></p>'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    # Check if footer-contact exists and owner name is not already in it
    if ($content -match '<div class="footer-contact" style="margin-top: 20px;">') {
        if (-not ($content -match 'Owner: Ravi Singh Dhakre</span></p>\s*<p style="opacity: 0.7; margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">\s*<i class="fa-solid fa-phone"')) {
             $content = $content -replace '<div class="footer-contact" style="margin-top: 20px;">', "<div class=`"footer-contact`" style=`"margin-top: 20px;`">`r`n                        $ownerHtml"
             [System.IO.File]::WriteAllText($f.FullName, $content)
             Write-Host "Updated owner in contact footer: $($f.Name)"
        }
    }
}
