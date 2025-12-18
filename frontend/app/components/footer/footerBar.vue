<!--
  Composant du pied de page principal.
  
  Footer complet avec 4 colonnes : Brand, Product, Company, Legal.
  Support du mode sombre et liens vers les différentes sections du site.
  
  Fonctionnalités :
  - Grille responsive (4 colonnes sur desktop)
  - Informations sur la marque
  - Liens de navigation
  - Liens légaux (Privacy, Terms, etc.)
  - Copyright avec année dynamique
-->
<!-- Footer -->
<template>
  <footer
    class="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <FooterBrand />

        <!-- Product -->
        <FooterProduct />
        <!-- Company -->
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white mb-4">
            Company
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >Contact</a
              >
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white mb-4">
            Legal
          </h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a
                href="#"
                class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >Privacy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                >Terms</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div
        class="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-600 dark:text-slate-400"
      >
        <p>&copy; 2024 wMusicSort. All rights reserved.</p>
        <div class="flex gap-4 mt-4 sm:mt-0">
          <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400"
            >Twitter</a
          >
          <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400"
            >GitHub</a
          >
          <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400"
            >Discord</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
