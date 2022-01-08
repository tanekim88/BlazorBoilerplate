import { spread } from 'solid-js/web';
export function createBox({ atoms: atomsFn, defaultClassName }) {
    const Box = (props) => {
        const tag = props.as ?? 'div';
        const el = document.createElement(tag);
        let hasAtomProps = false;
        let atomProps = {};
        let otherProps = {};
        for (const key in props) {
            if (atomsFn.properties.has(key)) {
                hasAtomProps = true;
                atomProps[key] = props[key];
            }
            else {
                otherProps[key] = props[key];
            }
        }
        const className = props.class;
        props.class = (hasAtomProps || className
            ? `${className ?? ""}${hasAtomProps && className ? " " : ""}${hasAtomProps ? atomsFn(atomProps) : ""}`
            : undefined) + (defaultClassName ? ` ${defaultClassName}` : "");
        spread(el, props);
        return el;
    };
    function createVariants(variants) {
        return variants;
    }
    return { Box, createVariants };
}
export function createBoxWithAtomsProp({ atoms: atomsFn, defaultClassName }) {
    const Box = (props) => {
        const tag = props.as ?? 'div';
        const el = document.createElement(tag);
        const atoms = props.atoms;
        const hasAtomProps = typeof atoms !== "undefined";
        const className = props.class;
        props.class = (hasAtomProps || className
            ? `${className ?? ""}${hasAtomProps && className ? " " : ""}${hasAtomProps ? atomsFn(atoms) : ""}`
            : undefined) + (defaultClassName ? ` ${defaultClassName}` : "");
        spread(el, props);
        return el;
    };
    function createVariants(variants) {
        return variants;
    }
    return { Box, createVariants };
}
// EXAMPLES
// const variants = createVariants({
//     h1: {
//       fontSize: "extraLarge",
//       fontWeight: "600",
//     },
//     h2: {
//       fontSize: "large",
//       fontWeight: "400",
//     },
//     p: {
//       fontSize: {
//         desktop: "medium",
//         mobile: "large",
//       },
//     },
//   });
//   type Props = {
//     variant: keyof typeof variants;
//     children: React.ReactNode;
//   };
//   const Text = ({ variant, children }: Props) => {
//     return <Box {...variants[variant]}>{children}</Box>;
//   };
//# sourceMappingURL=index.js.map