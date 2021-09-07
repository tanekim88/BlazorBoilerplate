

# Get-ChildItem  -Filter *.js -Include *.js -Exclude **/node_modules/**/* -File -Recurse ../  | Foreach-Object {       

#     If (! (  $_.FullName | Select-String -Pattern 'node_modules' )) {
#         if ($_.FullName | Select-String -Pattern '.js$' ) {
#             Remove-Item $_.FullName -Force
#         }
#     }
# }


$files = "../auth/*.js", "../BlazorApp/Client/*.js" , "../*.js", "../Shared/*.js" 

foreach ($file in $files) {
    Get-ChildItem  -Filter *.js -Include *.js -Exclude **/node_modules/**/* -File $file   | Foreach-Object {       

        If (! ($_.FullName | Select-String -Pattern 'node_modules' )) {
            if ($_.FullName | Select-String -Pattern '.js$' -and !($_.FullName | Select-String -Pattern 'tailwind.config.js$') ) {
                Remove-Item $_.FullName -Force
            }
        }
    }
}
