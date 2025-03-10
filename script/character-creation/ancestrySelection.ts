class AncestrySelection {
	private container: HTMLElement = document.querySelector(".ancestry");

	public getAncestryImage(ancestry: string): HTMLImageElement {
		const img = document.createElement("img");
		img.classList.add("ancestry-image");
		img.src = `/resources/images/ancestries/${ancestry.toLowerCase()}.png`;
		img.onerror = () => {
			img.src = "/resources/images/ancestries/missing.png";
		};
		return img;
	}

	public createAncestrySelection(): void {
		ancestries.list.forEach((ancestry: Ancestry) => {
			const ancestrySelect = this.createAncestrySelect(ancestry);

			ancestrySelect.addEventListener("click", () => {
				console.log(ancestry);
			});
			this.container.append(ancestrySelect);
		});
	}

	public createAncestryDetails(ancestry: Ancestry): HTMLDivElement {
		const ancestryDetails = document.createElement("div");
		ancestryDetails.classList.add("ancestry-details");

		// Abilities
		const abilities = document.createElement("div");
		abilities.classList.add("abilities");
		const abilitiesTitle = document.createElement("h3");
		abilitiesTitle.textContent = "Abilities";
		const abilitiesText = document.createElement("p");
		abilitiesText.textContent = ancestry.getStaticAbilities();
		abilities.append(abilitiesTitle, abilitiesText);
		if (ancestry.hasFreeAbility()) {
			const freeAbility = document.createElement("p");
			freeAbility.textContent = "+2 Any ability score";
			abilities.append(freeAbility);
		}

		// Movement speed
		const speed = document.createElement("div");
		speed.classList.add("speed");
		const speedTitle = document.createElement("h3");
		speedTitle.textContent = "Speed";
		const speedText = document.createElement("p");
		speedText.textContent = `${ancestry.getLandSpeed()} feet`;
		speed.append(speedTitle, speedText);

		ancestryDetails.append(abilities, speed);

		return ancestryDetails;
	}

	public createAncestrySelect(ancestry: Ancestry): HTMLDivElement {
		const wrapper = document.createElement("div");
		wrapper.classList.add("ancestry-wrapper");
		const ancestrySelect = document.createElement("div");
		ancestrySelect.classList.add("ancestry-select");

		const nameAndSource = document.createElement("div");
		nameAndSource.classList.add("name-and-source");
		const ancestryName = document.createElement("h2");
		const ancestrySource = document.createElement("p");
		ancestryName.textContent = ancestry.name;
		ancestrySource.textContent = ancestry.source.join(", ");
		nameAndSource.append(ancestryName, ancestrySource);

		const ancestryImage = this.getAncestryImage(ancestry.name);

		const openDetailsSymbol = document.createElement("span");
		openDetailsSymbol.classList.add("open-details-symbol");
		openDetailsSymbol.textContent = ">";

		ancestrySelect.append(ancestryImage, nameAndSource, openDetailsSymbol);

		wrapper.append(ancestrySelect);

		ancestrySelect.addEventListener("click", () => {
			console.log(ancestry);
			ancestrySelect.classList.toggle("detailed");
			if (ancestrySelect.classList.contains("detailed")) {
				const ancestryDetails = this.createAncestryDetails(ancestry);
				console.log("??");
				wrapper.append(ancestryDetails);
			} else {
				wrapper.querySelector(".ancestry-details").remove();
			}
		});

		return wrapper;
	}
}
