/**
 * Composable gérant la liste des catégories musicales.
 * 
 * Fournit les fonctionnalités d'ajout et de suppression de catégories
 * avec attribution automatique de couleurs.
 * 
 * @returns API pour gérer les catégories
 * 
 * @example
 * ```typescript
 * const { categories, addCategory, removeCategory } = useCategoryManager()
 * 
 * addCategory('Rock')
 * addCategory('Jazz')
 * removeCategory('Rock')
 * ```
 */
export const useCategoryManager = () => {
    /** Liste réactive des catégories créées - partagée globalement */
    const categories = useState<Category[]>('categories', () => []);

    /**
     * Classes Tailwind de couleurs disponibles pour les catégories.
     * Les couleurs sont attribuées en cycle selon l'ordre d'ajout.
     */
    const colorClasses = [
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-lime-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-violet-500",
        "bg-purple-500",
        "bg-pink-500",
    ];

    /**
     * Ajoute une nouvelle catégorie avec une couleur automatiquement assignée.
     * 
     * La couleur est choisie en cycle parmi les 12 couleurs disponibles
     * en fonction du nombre de catégories existantes.
     * 
     * @param categoryName - Nom de la catégorie à ajouter
     */
    const addCategory = (categoryName: string) => {
        categories.value.push({
            name: categoryName,
            color:
                colorClasses[categories.value.length % colorClasses.length] ||
                "bg-slate-500",
        });
    };

    /**
     * Supprime une catégorie de la liste.
     * 
     * @param categoryName - Nom exact de la catégorie à supprimer
     */
    const removeCategory = (categoryName: string) => {
        categories.value = categories.value.filter((c) => c.name !== categoryName);
    };

    return {
        categories,
        addCategory,
        removeCategory
    }
}