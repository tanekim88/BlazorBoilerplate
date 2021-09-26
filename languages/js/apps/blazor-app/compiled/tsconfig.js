export default {
    compilerOptions: {
        outDir: './compiled/',
        sourceMap: true,
        noImplicitAny: false,
        module: 'ESNext',
        target: 'ESNext',
        strict: false,
        moduleResolution: 'node',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        jsx: 'react',
        allowJs: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        lib: [
            "ESNext",
            'DOM'
        ],
        types: ['jest', 'node', 'vite/client'],
        baseUrl: './'
    },
    include: [
        "**/*",
        ".eslintrc.ts",
        ".prettierrc.ts",
        ".stylelintrc.ts",
        "./apps/shared/.eslintrc.ts",
        "./apps/shared/.prettierrc.ts",
        "./apps/shared/.stylelintrc.ts",
        "./apps/auth/.eslintrc.ts",
        "./apps/auth/.prettierrc.ts",
        "./apps/auth/.stylelintrc.ts",
        "./apps/solid-app/.eslintrc.ts",
        "./apps/solid-app/.prettierrc.ts",
        "./apps/solid-app/.stylelintrc.ts",
    ],
    exclude: ['**/node_modules/*', 'node_modules/*', '**/compiled/*', '**/styles/*', '**/absolute-root/*'],
};
//# sourceMappingURL=tsconfig.js.map