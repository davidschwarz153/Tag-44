interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
}

async function fetchPokemonList(): Promise<Pokemon[]> {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) throw new Error("Failed try again");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchPokemonDetails(
  url: string
): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch Pokémon details");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

function renderPokemonList(pokemonList: Pokemon[]): void {
  const listContainer = document.getElementById("pokemon-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";
  pokemonList.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.className = "cursor-pointer text-blue-500 hover:underline";
    listItem.textContent = pokemon.name;
    listItem.addEventListener("click", async () => {
      const details = await fetchPokemonDetails(pokemon.url);
      if (details) renderPokemonDetails(details);
    });
    listContainer.appendChild(listItem);
  });
}

function renderPokemonDetails(details: PokemonDetails): void {
  const detailsContainer = document.getElementById("pokemon-details");
  if (!detailsContainer) return;
  detailsContainer.innerHTML = `
    <div class="p-4 border rounded shadow-md bg-white">
      <h2 class="text-2xl font-bold mb-4">${details.name}</h2>
      <img class="w-32 h-32 mx-auto mb-4" src="${
        details.sprites.front_default
      }" alt="${details.name}">
      <p class="text-lg">Height: ${details.height}</p>
      <p class="text-lg">Weight: ${details.weight}</p>
      <h3 class="text-xl font-semibold mt-4">Abilities</h3>
      <ul class="list-disc list-inside">
        ${details.abilities
          .map((ability) => `<li>${ability.ability.name}</li>`)
          .join("")}
      </ul>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const pokemonList = await fetchPokemonList();
  renderPokemonList(pokemonList);
});
