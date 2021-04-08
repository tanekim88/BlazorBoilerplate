import './_index.scss';
import { MDCSnackbar } from '@material/snackbar';

[].map.call(document.querySelectorAll('.mdc-snackbar'), function (el) {
    const snackbar = new MDCSnackbar(el);
    // snackbar.open();
});
