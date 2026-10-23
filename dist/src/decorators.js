"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSpellPower = ValidateSpellPower;
exports.Cache = Cache;
// ---------- Exercice 4 : ValidateSpellPower ----------
// Décorateur qui refuse les sorts avec une puissance négative
function ValidateSpellPower(target, // Classe qui contient la méthode
propertyKey, // Nom de la méthode décorée
descriptor // Informations sur la méthode
) {
    const original = descriptor.value; // Garder la méthode originale
    // Remplacer la méthode par une nouvelle fonction
    descriptor.value = function (spell) {
        // Vérifier si la puissance est négative
        if (spell.power < 0) {
            // Arrêter et afficher une erreur
            throw new Error(`Puissance invalide pour "${spell.name}" : ${spell.power} (doit être >= 0)`);
        }
        // Si la puissance est valide, appeler la méthode originale
        return original.call(this, spell);
    };
    // Retourner la méthode modifiée
    return descriptor;
}
// ---------- Exercice 5 : Cache ----------
// Stocker un cache différent pour chaque instance
const caches = new WeakMap();
// Décorateur qui mémorise les résultats des méthodes
function Cache(target, // Classe qui contient la méthode
propertyKey, // Nom de la méthode
descriptor // Informations sur la méthode
) {
    const original = descriptor.value; // Garder la méthode originale
    // Remplacer la méthode par une nouvelle fonction
    descriptor.value = function (...args) {
        // Chercher le cache de cette instance
        let cache = caches.get(this);
        // Si aucun cache n'existe, en créer un
        if (!cache) {
            cache = new Map();
            caches.set(this, cache);
        }
        // Créer une clé avec le nom de la méthode et ses arguments
        const key = `${propertyKey}:${JSON.stringify(args)}`;
        // Vérifier si le résultat existe déjà
        if (cache.has(key)) {
            return cache.get(key); // Retourner le résultat mémorisé
        }
        // Exécuter la méthode originale si le résultat n'existe pas
        const result = original.apply(this, args);
        // Enregistrer le résultat dans le cache
        cache.set(key, result);
        // Retourner le résultat calculé
        return result;
    };
    // Retourner la méthode modifiée
    return descriptor;
}
