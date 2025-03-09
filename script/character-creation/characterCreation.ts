class CharacterCreator {
	private stages: Array<string> = ["details", "ancestry", "class", "background", "abilities", "skills"];
	private stage: string = "ancestry";
	/* Elements */
	private stagesNav: HTMLElement = document.querySelector(".stages-nav");

	/* Classes */
	private ancestrySelection: AncestrySelection = new AncestrySelection();
	private pointBuy: PointBuy = new PointBuy();

	public constructor() {}

	public createStages(): void {
		this.stagesNav.innerHTML = "";
		this.createCurrentStage();
		console.log("??");
		this.stages.forEach((stage: string, id: number) => {
			const button = document.createElement("button");
			button.textContent = `${id + 1}. ${stage}`;
			button.classList.add("stage-link");
			if (stage === this.stage) {
				button.classList.add("active");
			}
			button.addEventListener("click", () => {
				this.hideStage(this.stage);
				this.stage = stage;
				this.createStages();
				this.showStage(this.stage);
			});
			this.stagesNav.append(button);
		});
	}

	public hideStage(stage: string): void {
		document.querySelector(`.${stage}`).classList.add("hidden");
	}

	public showStage(stage: string): void {
		document.querySelector(`.${stage}`).classList.remove("hidden");
	}

	public createCurrentStage(): void {
		this.showStage(this.stage);
		switch (this.stage) {
			case "ancestry":
				this.createAncestryStage();
				break;
			case "class":
				this.createClassStage();
				break;
			case "background":
				this.createBackgroundStage();
				break;
			case "abilities":
				this.createAbilitiesStage();
				break;
			case "skills":
				this.createSkillsStage();
				break;
			default:
				this.createDetailsStage();
		}
	}

	public createAncestryStage(): void {
		console.log(ancestries.list);
		if (ancestries.list.length === 0) {
			document.querySelector(".ancestry").textContent = "Loading...";
			return;
		}
		document.querySelector(".ancestry").innerHTML = "";
		this.ancestrySelection.createAncestrySelection();
	}

	public createClassStage(): void {}

	public createBackgroundStage(): void {}

	public createAbilitiesStage(): void {
		this.pointBuy.createPointBuy();
	}

	public createSkillsStage(): void {}

	public createDetailsStage(): void {}
}

const characterCreator = new CharacterCreator();
characterCreator.createStages();
