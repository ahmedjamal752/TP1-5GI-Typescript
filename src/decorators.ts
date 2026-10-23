
import type { Spell } from "./types";

// ---------- Exercice 4 : ValidateSpellPower ----------

// Décorateur qui refuse les sorts avec une puissance négative
export function ValidateSpellPower(
  target: object,                 // Classe qui contient la méthode
  propertyKey: string,            // Nom de la méthode décorée
  descriptor: PropertyDescriptor  // Informations sur la méthode
): PropertyDescriptor {

  const original = descriptor.value; // Garder la méthode originale

  // Remplacer la méthode par une nouvelle fonction
  descriptor.value = function (this: unknown, spell: Spell) {

    // Vérifier si la puissance est négative
    if (spell.power < 0) {
      // Arrêter et afficher une erreur
      throw new Error(
        `Puissance invalide pour "${spell.name}" : ${spell.power} (doit être >= 0)`
      );
    }

    // Si la puissance est valide, appeler la méthode originale
    return original.call(this, spell);
  };

  // Retourner la méthode modifiée
  return descriptor;
}


// ---------- Exercice 5 : Cache ----------

// Stocker un cache différent pour chaque instance
const caches = new WeakMap<object, Map<string, unknown>>();

// Décorateur qui mémorise les résultats des méthodes
export function Cache(
  target: object,                 // Classe qui contient la méthode
  propertyKey: string,            // Nom de la méthode
  descriptor: PropertyDescriptor  // Informations sur la méthode
): PropertyDescriptor {

  const original = descriptor.value; // Garder la méthode originale

  // Remplacer la méthode par une nouvelle fonction
  descriptor.value = function (this: object, ...args: unknown[]) {

    // Chercher le cache de cette instance
    let cache = caches.get(this);

    // Si aucun cache n'existe, en créer un
    if (!cache) {
      cache = new Map<string, unknown>();
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
