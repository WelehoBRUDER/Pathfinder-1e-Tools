interface PointBuyTypes {
	[lowFantasy: string]: number;
	standardFantasy: number;
	highFantasy: number;
	epicFantasy: number;
	mythicFantasy: number;
}

class PointBuy {
	screen: HTMLDivElement = document.querySelector(".point-buy");
	inputs: HTMLDivElement = document.querySelector(".point-inputs");
	pointsRemain: HTMLParagraphElement = document.querySelector(".point-remain");
	pointWarning: HTMLParagraphElement = document.querySelector(".warning");
	pointReminder: HTMLParagraphElement = document.querySelector(".reminder");

	abilityScores: Array<string> = ["str", "dex", "con", "int", "wis", "cha"];
	pointBuyTypes: PointBuyTypes = {
		lowFantasy: 10,
		standardFantasy: 15,
		highFantasy: 20,
		epicFantasy: 25,
		mythicFantasy: 30,
	};
	type: string = "highFantasy";
	points: number = this.pointBuyTypes.highFantasy; // Pathfinder Society uses 20 points as standard
	costs: { [key: number]: number } = {
		7: -4,
		8: -2,
		9: -1,
		10: 0,
		11: 1,
		12: 2,
		13: 3,
		14: 5,
		15: 7,
		16: 10,
		17: 13,
		18: 17,
	};
	min: number = 7;
	max: number = 18;

	changePointBuyType = (type: string): void => {
		const prevType: string = this.type;
		this.type = type;
		const difference: number = this.pointBuyTypes[type] - this.pointBuyTypes[prevType];
		this.points += difference;
		this.updatePoints();
	};

	createInput = (ability: string): HTMLTableRowElement => {
		const div = document.createElement("tr");
		div.classList.add("point-input");
		const labelTh = document.createElement("th");
		const inputTh = document.createElement("th");
		const modifierTh = document.createElement("th");

		const label = document.createElement("label");
		label.textContent = ability.toUpperCase();

		const modifier = document.createElement("span");
		modifier.className = `ability-modifier ${ability}`;
		modifier.textContent = "";

		labelTh.append(label);
		inputTh.append(this.createAbilityScoreInput(ability));
		modifierTh.append(modifier);
		inputTh.classList.add("score");
		div.append(labelTh, inputTh, modifierTh);

		return div;
	};

	createAbilityScoreInput(ability: string): HTMLDivElement {
		const container = document.createElement("div");
		const input = document.createElement("input");

		input.type = "number";
		input.value = characterCreator.getPlayer().abilityScores.getAllScores()[ability].toString();
		input.min = this.min.toString();
		input.max = this.max.toString();
		input.addEventListener("focusout", () => {
			this.limitPoints(input);
			this.setScore(input, ability);
		});
		input.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				this.limitPoints(input);
				this.setScore(input, ability);
			}
		});

		let interval: any;
		const decrement = document.createElement("button");
		const increment = document.createElement("button");
		decrement.textContent = "-";
		increment.textContent = "+";
		decrement.addEventListener("mousedown", () => modifyAction(-1));
		increment.addEventListener("mousedown", () => modifyAction(1));
		decrement.addEventListener("mouseup", () => clearInterval(interval));
		increment.addEventListener("mouseup", () => clearInterval(interval));

		const modifyAction = (amount: number, auto?: boolean) => {
			input.value = (parseInt(input.value) + amount).toString();
			this.limitPoints(input);
			this.setScore(input, ability);
			if (!auto) {
				interval = setInterval(() => modifyAction(amount, true), 100);
			}
		};
		container.append(decrement, input, increment);

		return container;
	}

	limitPoints = (input: HTMLInputElement): void => {
		if (parseInt(input.value) > this.max) {
			input.value = this.max.toString();
		} else if (parseInt(input.value) < this.min) {
			input.value = this.min.toString();
		}
	};

	updateModifiers() {
		const modifiers = characterCreator.getPlayer().abilityScores.getAllModifiers();
		document.querySelectorAll(".ability-modifier").forEach((modifier) => {
			const mod: number = modifiers[modifier.classList[1]];
			modifier.textContent = `${mod >= 0 ? "+" : ""}${modifiers[modifier.classList[1]]}`;
		});
	}

	updatePoints(): void {
		this.pointsRemain.textContent = `Points Remaining: ${this.points.toString()}`;
		this.pointWarning.style.display = this.points < 0 ? "block" : "none";
		this.pointReminder.style.display = this.points > 0 ? "block" : "none";
	}

	setScore(input: HTMLInputElement, score: string) {
		const prev = characterCreator.getPlayer().abilityScores.getAllScores()[score];
		const value = parseInt(input.value);
		if (isNaN(value)) {
			input.value = prev.toString();
			return;
		}
		characterCreator.getPlayer().abilityScores.modifyWithPointBuy(score, value - 10);
		this.points += this.costs[prev];
		this.points -= this.costs[value];
		this.updatePoints();
		this.updateModifiers();
	}

	createPointBuy = (): void => {
		this.inputs.innerHTML = "";
		this.createTableHead();
		this.updatePoints();
		this.abilityScores.forEach((ability) => {
			this.inputs.append(this.createInput(ability));
		});

		this.updateModifiers();
	};

	createTableHead() {
		const headerContents: Array<string> = ["Ability", "Score", "Modifier"];
		const head = document.createElement("tbody");
		const tr = document.createElement("tr");
		headerContents.forEach((content) => {
			const th = document.createElement("th");
			th.textContent = content;
			th.classList.add(content.toLowerCase());
			tr.append(th);
		});
		head.append(tr);
		this.inputs.append(head);
	}
}
