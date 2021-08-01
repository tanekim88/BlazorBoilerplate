import chokidar from 'chokidar';
import { debounceTime, Subject, throttleTime } from 'rxjs';
import { execSync } from 'child_process';

const subj = new Subject<void>();

subj.pipe(throttleTime(5000)).subscribe(() => {
    execSync('cd svelte && npm run build');
    console.log('Refreshed! :)')
});
// One-liner for current directory
chokidar.watch('./svelte', {
    ignored: [/node_modules|build/, /\.svelte-kit/]
}).on('all', (event, path) => {
    console.log(event, path);
    if (event === 'change') {
        subj.next();
    }
});