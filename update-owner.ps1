$files = Get-ChildItem -Filter *.html -Recurse
$ownerLine = '<p>&copy; 2026 Revanta Growth Media. All Rights Reserved. | Owner: Ravi Singh Dhakre</p>'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if ($content -match '<p>&copy; 2026 Revanta Growth Media\. All Rights Reserved\.</p>') {
        $content = $content -replace '<p>&copy; 2026 Revanta Growth Media\. All Rights Reserved\.</p>', $ownerLine
        [System.IO.File]::WriteAllText($f.FullName, $content)
        Write-Host "Updated owner in footer: $($f.Name)"
    }
}
