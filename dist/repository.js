"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpellRepository = exports.WizzardRepository = exports.Repository = void 0;
const decorators_1 = require("./decorators");
// ---------- Référentiel générique ----------
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return [...this.items];
    }
}
exports.Repository = Repository;
class WizzardRepository extends Repository {
    nextId = 1;
    // EX1 enregitrter un newwizzard est attribuer un id 
    addWizard(data) {
        const wizard = {
            name: data.name,
            house: data.house,
            id: this.nextId
        };
        this.nextId = this.nextId + 1;
        this.add(wizard);
        return wizard;
    }
    // Exercice 2 : Wizard["house"] = type à accès indexé (équivaut à House)
    findByHouse(house) {
        return this.getAll().filter((wizard) => wizard.house === house);
    }
}
exports.WizzardRepository = WizzardRepository;
class SpellRepository extends Repository {
    add(spell) {
        if (spell.power < 0 || spell.power > 100) {
            throw new Error("Puissance invalide !");
        }
        super.add(spell);
    }
}
exports.SpellRepository = SpellRepository;
__decorate([
    decorators_1.ValidateSpellPower
], SpellRepository.prototype, "add", null);
