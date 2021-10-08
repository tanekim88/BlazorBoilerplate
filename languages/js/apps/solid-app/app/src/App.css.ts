// styles.css.ts
import { atoms } from './sprinkles.css';

export const container = atoms({
  display: 'flex',
  paddingX: 'small',

  // Conditional atoms:
  flexDirection: {
    mobile: 'column',
    desktop: 'row',
  },
  // background: {
  //   lightMode: 'blue-50',
  //   darkMode: 'gray-700',
  // }
});

// const flexDirection = Math.random() > 0.5 ? 'column' : 'row';

// document.write(`
//   <section class="${atoms({ display: 'flex', flexDirection })}">
//     ...
//   </section>
// `);