// Adapted from the author's Jelly's Lab: https://github.com/ttran293/jelly-coffee-and-tea
export type CardRecipe = {
  id: string;
  number: string;
  title: string;
  meta: string;
  ingredients: string[];
  steps: string[][];
  note: string;
};

// Short card-sized versions of the recipes shown in the notebook above.
export const CARD_RECIPES: CardRecipe[] = [
  {
    id: "basic-matcha-latte",
    number: "01",
    title: "Go-to basic matcha latte",
    meta: "5–10 MIN · 1 GLASS",
    ingredients: ["3 g matcha", "30 g water at 175°F", "90–100 ml milk of choice", "1 tsp syrup (optional)", "Ice (optional)"],
    steps: [
      ["Sift matcha; whisk with", "hot water until frothy."],
      ["Add ice + syrup to", "a glass, then milk."],
      ["Pour matcha over milk;", "stir before drinking."],
    ],
    note: "MATCHA : WATER : MILK = 1 : 10 : 30.",
  },
  {
    id: "lemon-tea-batch", number: "02", title: "Lemon tea (batch)", meta: "ABOUT 1 L",
    ingredients: ["850 g brewed tea", "270 g lemon syrup", "Ice"],
    steps: [["Brew tea or use", "Ito En bottled tea."], ["Mix in lemon syrup.", "Chill well."], ["Serve over ice;", "adjust syrup to taste."]],
    note: "BLACK TEA MAY NEED MORE SYRUP.",
  },
  {
    id: "lemon-matcha", number: "03", title: "Lemon matcha", meta: "1 GLASS",
    ingredients: ["35–40 g lemon syrup", "80 g water", "3 g matcha", "60 g warm water", "Ice"],
    steps: [["Whisk matcha with", "60 g warm water."], ["Mix lemon syrup +", "80 g water in glass."], ["Add ice; pour matcha", "over. Stir to drink."]],
    note: "USE THE LEMON SYRUP RECIPE.",
  },
];

