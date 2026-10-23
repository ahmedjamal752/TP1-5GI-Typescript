import { Cache } from "./decorators";
import { SpellRepository, WizzardRepository } from "./repository";
import { HOUSES, type House, type SpellCastEvent, type Wizard } from "./types";
// =============== Exercice 1 : ajouter un sorcier ===============
console.log("--- Exercice 1 ---");
const wizards = new WizzardRepository();
const harry = wizards.addWizard({ name: "Harry Potter", house: "Gryffindor" });
const draco = wizards.addWizard({ name: "Draco Malfoy", house: "Slytherin" });
wizards.addWizard({ name: "Hermione Granger", house: "Gryffindor" });
console.log(harry); // id: 1
console.log(draco); // id: 2

// =============== Exercice 2 : filtrer par maison ===============
console.log("--- Exercice 2 ---");
console.log(wizards.findByHouse("Gryffindor").map((w) => w.name)); // Harry, Hermione
console.log(wizards.findByHouse("Ravenclaw")); 



// =============== Exercice 3 : Extract ===============
console.log("--- Exercice 3 ---");
function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}

handleSpellCast({ type: "spell-cast", wizardId: 1, spellName: "Expelliarmus" });
// handleSpellCast({ type: "level-up", wizardId: 1, newLevel: 2 }); // ❌ refusé par TypeScript

// =============== Exercice 4 : décorateur ValidateSpellPower ===============
console.log("--- Exercice 4 ---");
const spells = new SpellRepository();

spells.add({ id: 1, name: "Expelliarmus", power: 8 }); // ✅ valide
console.log("Sorts enregistrés :", spells.getAll().length);

try {
  spells.add({ id: 2, name: "Sort raté", power: -5 }); // ❌ rejeté
} catch (error) {
  console.log("Erreur attendue :", (error as Error).message);
}
console.log("Sorts enregistrés :", spells.getAll().length); // toujours 1

// =============== Exercice 5 : décorateur Cache ===============
console.log("--- Exercice 5 ---");
class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}

const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3)); // Calculating... puis 30
console.log(calculator.calculatePower(10, 3)); // 30 (depuis le cache)
console.log(calculator.calculatePower(5, 2)); // Calculating... puis 10

// =============== Exercice 6 : Type Guards ===============
console.log("--- Exercice 6 ---");

// Étape 1 : isHouse vérifie l'appartenance aux 4 valeurs autorisées
function isHouse(value: unknown): value is House {
  return typeof value === "string" && (HOUSES as readonly string[]).includes(value);
}

// Étape 2 : isWizard utilise isHouse (au lieu de typeof house === "string")
function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    isHouse(obj.house)
  );
}





