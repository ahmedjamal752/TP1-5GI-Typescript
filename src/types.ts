
export const HOUSES = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"] as const;
export type House = (typeof HOUSES)[number];

export interface Wizard {
  id: number;
  name: string;
  house: House;
}

export interface Spell {
  id: number;
  name: string;
  power: number;
}

export type NewWizard = Omit<Wizard, "id">;




// ---------- Événements (union discriminée) ----------
export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };


export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;


