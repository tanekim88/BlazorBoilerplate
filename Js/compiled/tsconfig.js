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
        ],
        types: ['jest', 'node', 'vite/client'],
        baseUrl: './',
        paths: {
            "@shared/*": [
                "./apps/shared/*"
            ],
            "@auth/*": [
                "./apps/auth/*"
            ],
            "@blazor-app/*": [
                "./apps/blazor-app/*"
            ],
            "@Auth/*": [
                "../Apps/Auth/Server/*"
            ],
            "@BlazorApp/*": [
                "../Apps/BlazorApp/Client/*"
            ],
            "@root/*": [
                "*"
            ]
        },
    },
    include: [
        "**/*",
        ".eslintrc.ts",
        ".prettierrc.ts",
        ".stylelintrc.ts",
        "@shared/.eslintrc.ts",
        "@shared/.prettierrc.ts",
        "@shared/.stylelintrc.ts",
        "./apps/auth/.eslintrc.ts",
        "./apps/auth/.prettierrc.ts",
        "./apps/auth/.stylelintrc.ts",
        "./apps/blazor-app/.eslintrc.ts",
        "./apps/blazor-app/.prettierrc.ts",
        "./apps/blazor-app/.stylelintrc.ts",
    ],
    exclude: ['**/node_modules/*', 'node_modules/*', '**/compiled/*', '**/styles/*'],
};
//# sourceMappingURL=tsconfig.js.map