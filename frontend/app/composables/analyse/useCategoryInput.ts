/**
 * Composable gérant la saisie et la validation des noms de catégories.
 * 
 * Fournit la logique de validation, détection de doublons et gestion des erreurs
 * pour le champ de saisie de catégories.
 * 
 * @param categories - Référence réactive vers la liste des catégories existantes
 * @returns API pour gérer l'input de catégorie avec validation
 * 
 * @example
 * ```typescript
 * const categories = ref<Category[]>([])
 * const { newCategoryName, hasError, validateAndGetName, resetInput } = useCategoryInput(categories)
 * 
 * const handleAdd = () => {
 *   const name = validateAndGetName()
 *   if (name) {
 *     // Ajouter la catégorie
 *     resetInput()
 *   }
 * }
 * ```
 */
export const useCategoryInput = (categories: Ref<Category[]>) => {
    /** Valeur actuelle du champ de saisie */
    const newCategoryName = ref("");
    
    /** Indique si une erreur de validation est présente */
    const hasError = ref(false);
    
    /** Indique si l'animation de secousse est active */
    const isShaking = ref(false);

    /**
     * Affiche l'erreur avec une animation de secousse.
     * L'erreur disparaît automatiquement après 2 secondes.
     */
    const showError = () => {
        hasError.value = true;
        isShaking.value = true;

        setTimeout(() => {
            isShaking.value = false;
        }, 500);

        setTimeout(() => {
            hasError.value = false;
        }, 2000);
    }

    /**
     * Vérifie si un nom de catégorie existe déjà.
     * La comparaison est insensible à la casse et aux accents.
     * 
     * @param name - Nom à vérifier
     * @returns true si le nom existe déjà, false sinon
     */
    const checkDuplicate = (name: string): boolean => {
        const normalizedName = stringNormalize(name)

        return categories.value.some((category) => stringNormalize(category.name.toLowerCase()) === normalizedName.toLowerCase())
    }

    /**
     * Valide le nom saisi et le retourne s'il est valide.
     * 
     * Vérifie que le nom n'est pas vide et n'existe pas déjà.
     * Affiche une erreur visuelle si la validation échoue.
     * 
     * @returns Le nom validé (trimé) ou null si invalide
     */
    const validateAndGetName = (): string | null => {
        const trimmedName = newCategoryName.value.trim()

        if (!trimmedName) return null

        if (checkDuplicate(trimmedName)) {
            showError()
            return null
        }

        return trimmedName
    }

    /**
     * Réinitialise le champ de saisie.
     * Doit être appelé après l'ajout réussi d'une catégorie.
     */
    const resetInput = () => {
        newCategoryName.value = ""
    }

    return {
        newCategoryName,
        hasError,
        isShaking,
        validateAndGetName,
        resetInput
    }
}