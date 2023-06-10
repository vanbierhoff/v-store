module.exports = {
    root: true,
    overrides: [
        {
            files: ["*.ts", "*.js"],
            parserOptions: {
                project: [
                    "tsconfig.json"
                ],
                ecmaVersion: "latest",
                createDefaultProgram: true,
                env: {
                    es6: true
                },
            },
            extends: ["plugin:@angular-eslint/recommended"],
            rules: {
                '@typescript-eslint/no-non-undefined-assertion': 'error',
                // "no-use-before-define": 'off',
                // "@typescript-tslint/no-use-before-define": 'off',
            }
        },
        {
            files: ["*.component.html"],
            extends: ["plugin:@angular-eslint/template/recommended"],
            rules: {
                "max-len": ["error", {"code": 140}],
            }
        },
        {
            files: ["*.component.ts"],
            extends: ["plugin:@angular-eslint/template/process-inline-templates"],
            rules: {
                '@typescript-eslint/no-non-undefined-assertion': 'off',
                "@typescript-eslint/no-use-before-define": 'off'
            }
        }
    ]
}
