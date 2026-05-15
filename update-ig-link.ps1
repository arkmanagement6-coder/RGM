$files = Get-ChildItem -Filter *.html -Recurse
$oldLink = 'https://www.instagram.com/revantagrowthmedia/'
$newLink = 'https://www.instagram.com/revanta.growth.media/'

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if ($content.Contains($oldLink)) {
        $content = $content.Replace($oldLink, $newLink)
        [System.IO.File]::WriteAllText($f.FullName, $content)
        Write-Host "Updated IG link in $($f.Name)"
    }
}
