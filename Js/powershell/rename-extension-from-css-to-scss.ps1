

Get-ChildItem  -Filter *.* -File -Recurse ../  | Foreach-Object {       

    If (! (  $_.FullName | Select-String -Pattern 'node_modules' )) {
        if ($_.FullName | Select-String -Pattern '.s?css$' ) {
            $content = Get-Content -Path $_.FullName;
            $newContent = $content -replace '/index.css', ''
            $newContent = $content -replace '(/.*)\.css', '$1'
            $newContent = $content -replace '@import', '@use'
            Set-Content -path $_.FullName    -Value $newContent
            Rename-Item -Path $_.FullName ( $_.Name -Replace '\.css$'  , '.scss') -Force;
        }
    }
}