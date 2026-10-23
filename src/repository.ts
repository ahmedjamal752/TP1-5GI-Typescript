import { ValidateSpellPower } from "./decorators";
import type { NewWizard, Wizard, Spell } from "./types";

// ---------- Référentiel générique ----------
export class Repository<T extends { id: number }> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

export class WizzardRepository extends Repository<Wizard>{
    nextId = 1;


        // EX1 enregitrter un newwizzard est attribuer un id 


    addWizard(data: NewWizard): Wizard {
        const wizard: Wizard = {
            name: data.name,
            house: data.house,
            id: this.nextId
        };

        this.nextId = this.nextId + 1;

        this.add(wizard);

        return wizard;
    }

        // Exercice 2 : Wizard["house"] = type à accès indexé (équivaut à House)
    findByHouse(house: Wizard["house"]): Wizard[] {
        return this.getAll().filter((wizard) => wizard.house === house);
    }
}


export class SpellRepository extends Repository<Spell> {

  @ValidateSpellPower
  add(spell: Spell): void {
    if (spell.power < 0 || spell.power > 100) {
      throw new Error("Puissance invalide !");
    }

    super.add(spell);
  }
}







