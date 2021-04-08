

Get-ChildItem  -Filter *.* -File -Recurse ../  | Foreach-Object {       

   If(! (  $_.FullName | Select-String -Pattern 'node_modules' )){
       if($_.FullName | Select-String -Pattern '.css$' ){
           $content = Get-Content -Path $_.FullName;
          $newContent = $content -replace '_index.scss', 'index.css'
        #    Rename-Item -Path $_.FullName $_.Name.Replace('_index.css', 'index.css') -Force;
    Set-Content -path $_.FullName    -Value $newContent
    }
   }
}