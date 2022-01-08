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
    include: [],
    exclude: ['**/node_modules/*', 'node_modules/*', '**/compiled/*', '**/styles/*', '**/absolute-root/*'],
};
//# sourceMappingURL=tsconfig.js.map