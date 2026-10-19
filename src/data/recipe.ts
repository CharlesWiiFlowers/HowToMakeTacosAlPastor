/**
 * Recipe content for "Tacos al Pastor".
 * All data lives here so the presentation components stay lean.
 */

export interface Ingredient {
  id: string
  quantity: string
  name: string
}

export interface IngredientGroup {
  id: string
  title: string
  items: Ingredient[]
}

export interface RecipeStep {
  id: string
  title: string
  time: string
  description: string
  note?: string
}

export interface Tip {
  id: string
  title: string
  description: string
}

export interface MetaBadge {
  id: string
  label: string
  value: string
  detail?: string
  /** Draws extra attention (used for the hands-off marinating time). */
  emphasis?: boolean
}

export const recipeMeta: MetaBadge[] = [
  {
    id: 'prep',
    label: 'Active prep',
    value: '30 min',
    detail: 'hands-on',
  },
  {
    id: 'marinating',
    label: 'Marinating',
    value: '4–12 h',
    detail: 'hands-off, refrigerated',
    emphasis: true,
  },
  {
    id: 'cooking',
    label: 'Cooking',
    value: '25–40 min',
    detail: 'skillet time',
  },
  {
    id: 'servings',
    label: 'Servings',
    value: '4–6',
    detail: 'people',
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    value: 'Intermediate',
  },
]

export const ingredientGroups: IngredientGroup[] = [
  {
    id: 'pork',
    title: 'For the pork',
    items: [
      { id: 'pork-meat', quantity: '800 g', name: 'boneless pork shoulder, thinly sliced' },
      { id: 'pork-oil', quantity: '2 tbsp', name: 'neutral cooking oil' },
      { id: 'pork-vinegar', quantity: '1 tbsp', name: 'white vinegar' },
      { id: 'pork-juice', quantity: '2 tbsp', name: 'fresh pineapple juice' },
      { id: 'pork-oregano', quantity: '1 tsp', name: 'dried Mexican oregano' },
      { id: 'pork-cumin', quantity: '1 tsp', name: 'ground cumin' },
      { id: 'pork-cinnamon', quantity: '½ tsp', name: 'ground cinnamon' },
      { id: 'pork-garlic', quantity: '3 cloves', name: 'garlic' },
      { id: 'pork-salt', quantity: 'to taste', name: 'salt and black pepper' },
    ],
  },
  {
    id: 'adobo',
    title: 'For the adobo marinade',
    items: [
      { id: 'adobo-guajillo', quantity: '3', name: 'dried guajillo chiles, stems and seeds removed' },
      { id: 'adobo-ancho', quantity: '1', name: 'dried ancho chile, stem and seed removed' },
      { id: 'adobo-onion', quantity: '½ small', name: 'white onion' },
      { id: 'adobo-achiote', quantity: '2 tbsp', name: 'achiote paste' },
      { id: 'adobo-cumin', quantity: '½ tsp', name: 'ground cumin' },
      { id: 'adobo-oregano', quantity: '1 tsp', name: 'dried Mexican oregano' },
      { id: 'adobo-vinegar', quantity: '2 tbsp', name: 'white vinegar' },
      { id: 'adobo-water', quantity: '½ cup', name: 'water, as needed for blending' },
    ],
  },
  {
    id: 'serving',
    title: 'For serving',
    items: [
      { id: 'serve-tortillas', quantity: '12–18', name: 'small corn tortillas' },
      { id: 'serve-pineapple', quantity: '½', name: 'fresh pineapple, cut into small pieces' },
      { id: 'serve-onion', quantity: '1 small', name: 'white onion, finely diced' },
      { id: 'serve-cilantro', quantity: '1 small bunch', name: 'fresh cilantro, chopped' },
      { id: 'serve-limes', quantity: '2', name: 'limes, cut into wedges' },
      { id: 'serve-salsa', quantity: 'to taste', name: 'salsa of choice' },
    ],
  },
]

export const allIngredientIds: string[] = ingredientGroups.flatMap((group) =>
  group.items.map((item) => item.id),
)

export const recipeSteps: RecipeStep[] = [
  {
    id: 'step-chiles',
    title: 'Prepare the chiles',
    time: '20 minutes',
    description:
      'Toast the guajillo and ancho chiles in a dry skillet over medium-low heat for 30–60 seconds per side, turning frequently, until they are fragrant and pliable. Transfer them to a bowl, cover with hot water, and soak for 10–15 minutes until softened.',
    note: 'Watch them closely — chiles go from toasted to burnt in seconds, and burnt chiles turn the entire marinade bitter. If one blackens, start over with a fresh chile.',
  },
  {
    id: 'step-adobo',
    title: 'Make the adobo',
    time: '5–10 minutes',
    description:
      'Drain the soaked chiles and blend them with the achiote paste, garlic, onion, oregano, cumin, vinegar, pineapple juice, and most of the water until completely smooth. Season with salt and black pepper.',
    note: 'Blend longer than you think you need. The marinade should be thick but pourable — add water one tablespoon at a time until it moves slowly, like heavy cream.',
  },
  {
    id: 'step-marinate',
    title: 'Marinate the pork',
    time: '4–12 hours, refrigerated',
    description:
      'Coat the thinly sliced pork with the adobo, making sure every surface is covered. Cover the bowl tightly and refrigerate for at least 4 hours, preferably overnight, and up to 12 hours.',
    note: 'Always marinate raw pork in the refrigerator, never on the counter. Keep it covered and separate from other foods to prevent cross-contamination.',
  },
  {
    id: 'step-toppings',
    title: 'Prepare the pineapple and toppings',
    time: '15 minutes',
    description:
      'Dice the pineapple and onion, chop the cilantro, cut the limes into wedges, and stir your salsa of choice. Get everything within arm’s reach before the meat hits the pan.',
    note: 'Al pastor is an assembly-line taco. Once the meat is hot, every topping should already be prepped and waiting.',
  },
  {
    id: 'step-cook',
    title: 'Cook the pork',
    time: '15–20 minutes',
    description:
      'Heat a heavy skillet or griddle over medium-high heat until very hot. Cook the pork in small batches so the pieces never touch, letting each batch sit undisturbed until the edges brown and char slightly. Flip, cook through, and repeat, adding a little oil if the pan looks dry.',
    note: 'An overcrowded pan drops in temperature and steams the meat instead of searing it. For food safety, pork is done at an internal temperature of 63 °C (145 °F) followed by a 3-minute rest — an instant-read thermometer, not color alone, tells you it is ready.',
  },
  {
    id: 'step-pineapple',
    title: 'Caramelize the pineapple',
    time: '5 minutes',
    description:
      'Sear the pineapple pieces in the hot skillet, cut side down, for 2–3 minutes per side until golden and lightly caramelized. Toss them with the cooked pork or keep them in a small bowl for topping.',
    note: 'The sweet, caramelized edges are what balance the smoky, savory chiles — do not skip them.',
  },
  {
    id: 'step-tortillas',
    title: 'Warm the tortillas',
    time: '5 minutes',
    description:
      'Warm the corn tortillas one at a time in a dry skillet for 30–60 seconds per side, until soft and lightly toasted. Stack them and wrap in a clean kitchen towel to hold the heat.',
    note: 'Cold tortillas crack and steal the spotlight. A warm, wrapped stack keeps every taco flexible.',
  },
  {
    id: 'step-assemble',
    title: 'Assemble the tacos',
    time: '5 minutes',
    description:
      'Divide the chopped pork among the warm tortillas. Finish with caramelized pineapple, diced onion, and cilantro, then add a squeeze of lime and a spoonful of salsa.',
    note: 'Aim for balance in every taco: rich smoky meat, sweet pineapple, sharp onion, fresh cilantro, and bright lime.',
  },
  {
    id: 'step-serve',
    title: 'Serve and enjoy',
    time: 'immediately',
    description:
      'Bring the tacos to the table right away while the tortillas and meat are still warm. Add a final squeeze of lime and pass your favorite salsa around.',
    note: 'Al pastor waits for no one — serve immediately and let everyone build their own.',
  },
]

export const kitchenTips: Tip[] = [
  {
    id: 'tip-chile',
    title: 'The Chile Rule',
    description:
      'Toast briefly over medium-low heat and pull the chiles the moment they smell fragrant. Burnt chiles will make the entire marinade bitter.',
  },
  {
    id: 'tip-texture',
    title: 'The Texture Rule',
    description:
      'Slice the pork thin and evenly, about 3–5 mm. Thin pieces cook quickly and develop far better browning and charred edges.',
  },
  {
    id: 'tip-pan',
    title: 'The Pan Rule',
    description:
      'Cook in small batches instead of steaming the meat in an overcrowded pan. Give every piece room to sear.',
  },
  {
    id: 'tip-flavor',
    title: 'The Flavor Rule',
    description:
      'Balance the rich marinade with sweet pineapple, fresh lime, raw onion, and cilantro. Each taco should taste smoky, savory, sweet, and bright at once.',
  },
  {
    id: 'tip-safety',
    title: 'The Safety Rule',
    description:
      'Refrigerate the pork while it marinates, keep raw meat separate to prevent cross-contamination, and verify doneness with a thermometer: 63 °C (145 °F) plus a 3-minute rest.',
  },
]
