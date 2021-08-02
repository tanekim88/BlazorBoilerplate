import chokidar from 'chokidar';
import { debounceTime, Subject, throttleTime } from 'rxjs';
import { execSync } from 'child_process';
import path from 'path';
const watchPath = path.resolve(__dirname, '..', 'svelte');
const subj = new Subject<void>();

function refresh(){
    execSync('cd svelte && npm run build');
    console.log('Refreshed! :)')
}

refresh();
subj.pipe(throttleTime(5000)).subscribe(() => {
    refresh();
});
// One-liner for current directory
chokidar.watch(watchPath, {
    ignored: [/node_modules|build/, /\.svelte-kit/]
}).on('all', (event, path) => {
    console.log(event, path);
    if (event === 'change') {
        subj.next();
    }
});