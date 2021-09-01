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
            'DOM',
            // 'ES2015.Core',
            // 'ES2015.Collection',
            // 'ES2015.Generator',
            // 'ES2015.Iterable',
            // 'ES2015.Promise',
            // 'ES2015.Proxy',
            // 'ES2015.Reflect',
            // 'ES2015.Symbol',
            // 'ES2015.Symbol.WellKnown',
            // 'ES2016.Array.Include',
            // 'ES2017.object',
            // 'ES2017.Intl',
            // 'ES2017.SharedMemory',
            // 'ES2017.String',
            // 'ES2017.TypedArrays',
            // 'ES2018.Intl',
            // 'ES2018.Promise',
            // 'ES2018.RegExp',
            // 'ESNext.AsyncIterable',
            // 'ESNext.Array',
            // 'ESNext.Intl',
            // 'ESNext.Symbol',
        ],
        types: ['jest', 'node', 'vite/client'],
        baseUrl: './',
        paths: {
            "#shared/*": [
                "./apps/shared/*"
            ],
            "#auth/*": [
                "./apps/auth/*"
            ],
            "#blazor-app/*": [
                "./apps/blazor-app/*"
            ],
            "#Auth/*": [
                "../Apps/Auth/Server/*"
            ],
            "#BlazorApp/*": [
                "../Apps/BlazorApp/Client/*"
            ],
            "#root/*": [
                "*"
            ]
        },
        // plugins: [{ name: 'typescript-plugin-css-modules' }],
    },
    include: [
        "**/*",
        ".eslintrc.ts",
        ".prettierrc.ts",
        ".stylelintrc.ts",
        "#shared/.eslintrc.ts",
        "#shared/.prettierrc.ts",
        "#shared/.stylelintrc.ts",
        "./apps/auth/.eslintrc.ts",
        "./apps/auth/.prettierrc.ts",
        "./apps/auth/.stylelintrc.ts",
        "./apps/blazor-app/.eslintrc.ts",
        "./apps/blazor-app/.prettierrc.ts",
        "./apps/blazor-app/.stylelintrc.ts",
    ],
    exclude: ['**/node_modules/*', 'node_modules/*', '**/compiled/*', '**/styles/*', '**/absolute-root/*'],
};
//# sourceMappingURL=tsconfig.js.map