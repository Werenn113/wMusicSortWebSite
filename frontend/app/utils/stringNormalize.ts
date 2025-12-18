/**
 * Table de correspondance pour la suppression des accents.
 * Permet de normaliser les caractères accentués en leur équivalent non-accentué.
 */
const ACCENT_TABLE: Record<string, string> = {
    // a
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
    // e
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    // i
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    // o
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
    // u
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    // autres
    'ç': 'c', 'ñ': 'n', 'œ': 'oe'
}

/**
 * Normalise une chaîne de caractères pour faciliter les comparaisons.
 * 
 * Cette fonction effectue les transformations suivantes :
 * - Conversion en minuscules
 * - Suppression des doubles espaces consécutifs
 * - Suppression des accents (é -> e, à -> a, etc.)
 * - Normalisation des caractères spéciaux (œ -> oe)
 * 
 * @param str - La chaîne de caractères à normaliser
 * @returns La chaîne normalisée (minuscules, sans accents, sans doubles espaces)
 * 
 * @example
 * ```typescript
 * stringNormalize("Café") // "cafe"
 * stringNormalize("Été") // "ete"
 * stringNormalize("Château  fort") // "chateau fort"
 * ```
 */
export function stringNormalize(str: string): string {
    let new_str = ""

    for (let i = 0; i < str.length; i++) {
        const char: string = str[i]!.toLocaleLowerCase()
        if (char === " " && str[i - 1] === " ") {
            continue
        }

        const equivalent: string | undefined = ACCENT_TABLE[char]
        new_str += equivalent ? equivalent : char
    }

    return new_str
}