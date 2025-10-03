export function snakeToPascal(str: string): string {
    return ('-' + str).replace(/-(\w)/g, (_, c) => c.toUpperCase());
}
