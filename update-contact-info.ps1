$oldEmail = "info@revantagrowthmedia.com"
$newEmail = "revantagrowthmedia@gmail.com"
$oldPhone = "8433206010"
$newPhone = "7668569852"

$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $originalContent = $content

    $content = $content -replace $oldEmail, $newEmail
    $content = $content -replace $oldPhone, $newPhone

    if ($originalContent -ne $content) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
