"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repository_1 = require("./repository");
const types_1 = require("./types");
// =============== Exercice 1 : ajouter un sorcier ===============
console.log("--- Exercice 1 ---");
const wizards = new repository_1.WizzardRepository();
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
function handleSpellCast(event) {
    console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}
handleSpellCast({ type: "spell-cast", wizardId: 1, spellName: "Expelliarmus" });
// handleSpellCast({ type: "level-up", wizardId: 1, newLevel: 2 }); // ❌ refusé par TypeScript
// =============== Exercice 4 : décorateur ValidateSpellPower ===============
console.log("--- Exercice 4 ---");
const spells = new repository_1.SpellRepository();
spells.add({ id: 1, name: "Expelliarmus", power: 8 }); // ✅ valide
console.log("Sorts enregistrés :", spells.getAll().length);
try {
    spells.add({ id: 2, name: "Sort raté", power: -5 }); // ❌ rejeté
}
catch (error) {
    console.log("Erreur attendue :", error.message);
}
console.log("Sorts enregistrés :", spells.getAll().length); // toujours 1
// =============== Exercice 5 : décorateur Cache ===============
console.log("--- Exercice 5 ---");
class SpellCalculator {
    calculatePower(basePower, multiplier) {
        console.log("Calculating...");
        return basePower * multiplier;
    }
}
__decorate([
    decorators_1.Cache
], SpellCalculator.prototype, "calculatePower", null);
const calculator = new SpellCalculator();
console.log(calculator.calculatePower(10, 3)); // Calculating... puis 30
console.log(calculator.calculatePower(10, 3)); // 30 (depuis le cache)
console.log(calculator.calculatePower(5, 2)); // Calculating... puis 10
// =============== Exercice 6 : Type Guards ===============
console.log("--- Exercice 6 ---");
// Étape 1 : isHouse vérifie l'appartenance aux 4 valeurs autorisées
function isHouse(value) {
    return typeof value === "string" && types_1.HOUSES.includes(value);
}
// Étape 2 : isWizard utilise isHouse (au lieu de typeof house === "string")
function isWizard(value) {
    if (typeof value !== "object" || value === null)
        return false;
    const obj = value;
    return (typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        isHouse(obj.house));
}
