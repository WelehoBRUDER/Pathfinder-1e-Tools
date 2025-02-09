class Player {
	name: string;
	abilityScores: AbilityScores;
	constructor(name: string) {
		this.name = name;
		this.abilityScores = new AbilityScores();
	}
}

interface Abilities {
	[str: string]: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
}

class AbilityScores {
	[key: string]: any;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;

	constructor() {
		this.str = 0;
		this.dex = 0;
		this.con = 0;
		this.int = 0;
		this.wis = 0;
		this.cha = 0;
	}

	modifyWithPointBuy(ability: string, value: number): void {
		this[ability] = value;
	}

	getModifier(score: number): number {
		return Math.floor((score - 10) / 2);
	}

	getAllModifiers(): Abilities {
		return {
			str: this.getModifier(this.getScore("str")),
			dex: this.getModifier(this.getScore("dex")),
			con: this.getModifier(this.getScore("con")),
			int: this.getModifier(this.getScore("int")),
			wis: this.getModifier(this.getScore("wis")),
			cha: this.getModifier(this.getScore("cha")),
		};
	}

	getAllScores(): Abilities {
		return {
			str: this.str + 10,
			dex: this.dex + 10,
			con: this.con + 10,
			int: this.int + 10,
			wis: this.wis + 10,
			cha: this.cha + 10,
		};
	}

	getScore(ability: string): number {
		return this[ability] + 10;
	}
}

let player = new Player("Player Character");
