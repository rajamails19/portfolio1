import type { Section } from "@/content/types";

export const qansSection: Section = {
  slug: "qans",
  title: "Chaat Q & Answers",
  tagline: "Street-food fundamentals — every question is a tasting note.",
  emoji: "◈",
  gradient: "from-[oklch(0.92_0.13_60)] via-[oklch(0.9_0.14_35)] to-[oklch(0.9_0.13_20)]",
  items: [
    {
      id: "what-is-chaat",
      question: "What actually makes something a 'chaat'?",
      tags: ["Fundamentals", "Chaat"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "==Chaat== is not a single dish — it's a **flavor architecture**. Every real chaat balances __six sensations at once__: sweet, sour, salty, spicy, crunchy, and creamy. Miss one and the plate falls flat." },
        { type: "heading", content: "The six-layer stack" },
        {
          type: "flow",
          title: "How a plate of chaat is built",
          direction: "vertical",
          nodes: [
            { label: "Base", sub: "Puri, papdi, tikki, sev", tone: "coral" },
            { label: "Cool", sub: "Yogurt / dahi", tone: "sky" },
            { label: "Sweet-sour", sub: "Imli (tamarind) chutney", tone: "coral" },
            { label: "Green heat", sub: "Mint-coriander chutney", tone: "mint" },
            { label: "Spice dust", sub: "Chaat masala, chilli, jeera", tone: "rose" },
            { label: "Crunch", sub: "Sev, pomegranate, onion", tone: "coral" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Golden rule: **assemble to order**. A chaat that sits for two minutes is a chaat that surrendered — the base goes soggy, the crunch dies, the plate loses its voice.",
        },
      ],
    },
    {
      id: "chaat-masala",
      question: "What's actually inside chaat masala?",
      tags: ["Spices", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "The signature funk of chaat masala comes from ==black salt (kala namak)== — that eggy, sulfurous note that makes tamarind and yogurt taste ten times louder." },
        {
          type: "table",
          headers: ["Ingredient", "What it brings"],
          rows: [
            ["Black salt (kala namak)", "==The signature funk== — sulfurous, savory"],
            ["Amchur (dried mango)", "Sharp, fruity sourness"],
            ["Roasted cumin", "Earthy, warm base note"],
            ["Black pepper + red chilli", "Slow-building heat"],
            ["Ajwain, hing, ginger powder", "Digestive lift"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "If you skip **kala namak**, it's not chaat masala — it's just spice mix. That one ingredient is the whole personality.",
        },
      ],
    },
    {
      id: "chutney-trio",
      question: "The two chutneys every chaat needs — and why.",
      tags: ["Chutney", "Balance"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Chaat runs on ==contrast==. You need __one sweet-sour__ and __one hot-fresh__ chutney, sitting side by side, doing opposite jobs." },
        { type: "heading", content: "Imli (tamarind) chutney" },
        {
          type: "list",
          items: [
            "Soak seedless tamarind in warm water, mash, strain the pulp.",
            "Simmer with jaggery/gur, roasted cumin, red chilli, black salt, and a pinch of ginger powder.",
            "Cook until it coats a spoon — thick, dark, glossy.",
          ],
        },
        { type: "heading", content: "Hari (green) chutney" },
        {
          type: "list",
          items: [
            "Blend fresh **coriander + mint** with green chilli, garlic, ginger, lemon, salt.",
            "Add a spoon of yogurt or roasted chana to keep the color from oxidizing.",
            "Keep it __thick__ — a watery green chutney drowns the puri.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Make both fresh in the morning. Store in glass, not steel — metal dulls the mint within a day.",
        },
      ],
    },
  ],
};

export const programsSection: Section = {
  slug: "programs",
  title: "Signature Recipes",
  tagline: "Full recipes — measured, timed, and station-tight.",
  emoji: "❋",
  gradient: "from-[oklch(0.92_0.12_45)] via-[oklch(0.9_0.14_25)] to-[oklch(0.9_0.12_10)]",
  items: [
    {
      id: "masala-dosa",
      question: "Recipe: Crispy Masala Dosa (from batter to plate)",
      tags: ["Dosa", "South Indian"],
      difficulty: "Hard",
      answer: [
        { type: "text", content: "A restaurant-grade dosa is __80% batter, 20% tawa==. Get the fermentation right and even a mediocre pan will sing." },
        { type: "heading", content: "The batter (day 1 + overnight)" },
        {
          type: "code",
          language: "text",
          content: `Rice        : 3 cups (idli rice or parboiled)
Urad dal    : 1 cup (whole, skinned)
Fenugreek   : 1 tsp (methi seeds)
Poha (flat) : 1/4 cup (crispness booster)
Salt        : 1.5 tsp (add AFTER fermenting)
Water       : as needed

1. Soak rice + poha (bowl A) and urad + methi (bowl B) separately, 5–6 hrs.
2. Grind urad first — fluffy, airy, cloud-like. Then rice — slightly grainy.
3. Combine, mix by HAND for 3–4 min (hands seed the fermentation).
4. Cover, ferment 8–12 hrs at 25–30°C until doubled and sour-smelling.
5. Add salt. Thin with water to buttermilk consistency.` ,
        },
        { type: "heading", content: "The potato masala" },
        {
          type: "list",
          ordered: true,
          items: [
            "Boil 4 potatoes, mash roughly (keep chunks).",
            "Temper: 1 tbsp oil → 1 tsp mustard seeds → curry leaves → 2 dried red chillies → 1 tsp urad dal → asafoetida.",
            "Add sliced onions, green chilli, ginger — sauté until pink.",
            "Add turmeric, salt, potatoes, 1/4 cup water. Mash together for 2 min. Finish with coriander + lemon.",
          ],
        },
        { type: "heading", content: "The tawa" },
        {
          type: "list",
          items: [
            "**Medium-high heat.** Sprinkle water — it should sizzle and evaporate in ~2 seconds.",
            "Rub half an onion dipped in oil across the tawa. This is the __non-stick trick__.",
            "Ladle batter, spiral outward from center in one continuous motion — thin, even.",
            "Drizzle ghee on the edges. Cook until the edges lift and turn golden-brown.",
            "Add a scoop of potato masala on one third. Fold. Serve immediately with sambar + coconut chutney.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "==Batter test==: drop a spoonful into water. If it floats, it's fermented. If it sinks, give it more time — no shortcut works.",
        },
      ],
    },
    {
      id: "pani-puri",
      question: "Recipe: Pani Puri (the real teekha-meetha stall version)",
      tags: ["Pani Puri", "Street"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Two waters, one filling, crunchy puris. The magic is in the ==teekha pani== — that ice-cold, mint-heavy, mouth-slapping green water." },
        { type: "heading", content: "Teekha (green, spicy) pani" },
        {
          type: "code",
          language: "text",
          content: `Fresh mint leaves    : 1 cup packed
Fresh coriander      : 1/2 cup
Green chillies       : 3–4 (adjust)
Ginger               : 1 inch
Tamarind pulp        : 2 tbsp
Roasted cumin powder : 1 tsp
Black salt           : 1.5 tsp
Chaat masala         : 1 tsp
Regular salt         : to taste
Cold water           : 4 cups
Boondi               : 2 tbsp (garnish)

1. Blend everything except water + boondi into a fine paste.
2. Strain through muslin — you want liquid, not pulp.
3. Whisk into ice-cold water. Chill 1 hour minimum.
4. Float boondi on top just before serving.` ,
        },
        { type: "heading", content: "Meetha (sweet) pani" },
        {
          type: "list",
          items: [
            "Tamarind + jaggery + dates, simmered thick with roasted cumin, black salt, and ginger powder.",
            "Strain, thin with water. Should be __pourable but coating__.",
          ],
        },
        { type: "heading", content: "The filling + assembly" },
        {
          type: "list",
          ordered: true,
          items: [
            "Boiled + mashed potato, boiled black chana, chopped onion, chaat masala, salt, lemon.",
            "Poke a hole in the crown of each puri (never the side — it cracks).",
            "Fill: 1 tsp potato-chana. Dip in **teekha pani** to the brim. Drizzle a few drops of meetha.",
            "Eat in ==one bite==. Never two. The whole point is the burst.",
          ],
        },
      ],
    },
    {
      id: "samosa",
      question: "Recipe: Bakery-style Punjabi Samosa (crispy, flaky, non-bubbly)",
      tags: ["Samosa", "Punjabi"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "A great samosa has a __smooth, blistered-free crust__ and a filling that holds its shape. The two secrets: ==enough ghee/oil in the dough== and ==low-heat frying==." },
        { type: "heading", content: "Dough (maida)" },
        {
          type: "code",
          language: "text",
          content: `Maida (plain flour) : 2 cups
Ghee or oil         : 4 tbsp (this is the moyan — the fat rub-in)
Ajwain (carom)      : 1/2 tsp
Salt                : 3/4 tsp
Cold water          : ~1/3 cup

Rub ghee into flour until it holds shape when pressed in the fist.
Add water little by little — DOUGH MUST BE STIFF, not soft. Rest 30 min.` ,
        },
        { type: "heading", content: "Filling" },
        {
          type: "list",
          items: [
            "Coarsely mashed boiled potato + boiled peas.",
            "Temper: oil → cumin → grated ginger + green chilli → coriander powder, garam masala, amchur, chaat masala, red chilli, salt.",
            "Fold in potatoes, sauté 3 min. Finish with fresh coriander. **Cool completely** before stuffing.",
          ],
        },
        { type: "heading", content: "Shape + fry" },
        {
          type: "list",
          ordered: true,
          items: [
            "Roll dough into an oval, cut in half — each half is one samosa.",
            "Form a cone, seal the seam with a water paste of flour. Stuff, pinch the top shut in a pleat.",
            "==Fry on LOW heat== (150°C) for 15–18 min until pale golden. Rest 5 min.",
            "Second fry on medium-high (180°C) for 2 min — deep golden, blistered-free, glass-crisp.",
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "If your samosas come out **bubbly and pale**, your oil was too hot. Low + slow first fry = smooth crust. This is the whole trick.",
        },
      ],
    },
  ],
};

export const realtimeSection: Section = {
  slug: "realtime",
  title: "Kitchen Live",
  tagline: "Real-time stall scenarios — what actually goes wrong during peak hour.",
  emoji: "⚡",
  gradient: "from-[oklch(0.92_0.13_40)] via-[oklch(0.9_0.15_20)] to-[oklch(0.88_0.14_0)]",
  items: [
    {
      id: "dosa-sticking",
      question: "Peak hour. Every dosa is sticking to the tawa. What's happening?",
      tags: ["Dosa", "Troubleshooting"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Three culprits, in order of likelihood: __tawa too cold==, __seasoning worn off__, or __batter too thick==. Diagnose fast — you have a queue." },
        {
          type: "flow",
          title: "60-second diagnosis",
          direction: "vertical",
          nodes: [
            { label: "Water-drop test", sub: "Sizzles in 2s? Heat is right", tone: "coral" },
            { label: "Onion-oil rub", sub: "Reseason the surface", tone: "rose" },
            { label: "Thin the batter", sub: "Add 2 tbsp water, whisk", tone: "mint" },
            { label: "Sacrifice one dosa", sub: "First one after re-season = test", tone: "sky" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "Keep a **half onion on a fork dipped in oil** by the station at all times. Rub the tawa every 3–4 dosas. This is what every good stall does — it's the invisible discipline.",
        },
      ],
    },
    {
      id: "puri-cracking",
      question: "Your pani puris are cracking when you poke them. Fix it in the next batch.",
      tags: ["Pani Puri", "Frying"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Cracking means the puris are __too dry, too thick, or fried too hot==. You can't save this batch — but you can nail the next one in 20 minutes." },
        {
          type: "table",
          headers: ["Symptom", "Real cause", "Fix next batch"],
          rows: [
            ["Cracks on poke", "Dough too dry", "Add 1 tbsp warm water + 5 min rest"],
            ["Puris don't puff", "Oil too cold OR rolled too thick", "Oil 180°C, roll paper-thin"],
            ["Puris go soft in minutes", "Fried too briefly", "Fry until deep golden, not pale"],
            ["Puris smell 'raw'", "Semolina not hydrated", "Rest dough 30 min minimum"],
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "**Ratio matters:** 1 cup sooji (fine semolina) + 2 tbsp maida + pinch of baking soda + salt + water. Sooji dominant = crisp shell. All maida = chewy sadness.",
        },
      ],
    },
    {
      id: "chutney-turning",
      question: "The green chutney turned brown by lunchtime. Rescue or restart?",
      tags: ["Chutney", "Prep"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "==Restart==. Browned chutney tastes flat — the oils have oxidized, the top-note is gone. But next time, prevent it with three tricks:" },
        {
          type: "list",
          ordered: true,
          items: [
            "**Blanch mint 10 seconds** in boiling water, then ice bath. This locks the chlorophyll green.",
            "Add a **squeeze of lemon** and a spoon of **yogurt or roasted chana dal** to the blender — both slow oxidation.",
            "Store in a **glass jar with cling film pressed directly on the surface** — no air = no browning.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "For a big stall day, make chutney in **two 500ml batches** instead of one 1L batch. Second batch stays vibrant until closing.",
        },
      ],
    },
  ],
};

export const projectsSection: Section = {
  slug: "projects",
  title: "Signature Dishes",
  tagline: "Full plate builds — the story, the plating, the standing ovation.",
  emoji: "★",
  gradient: "from-[oklch(0.9_0.14_30)] via-[oklch(0.88_0.15_15)] to-[oklch(0.85_0.14_355)]",
  items: [
    {
      id: "hyderabadi-biryani",
      question: "Signature: Hyderabadi Dum Biryani (kacchi style, from scratch)",
      tags: ["Biryani", "Hyderabad", "Signature"],
      difficulty: "Hard",
      answer: [
        { type: "text", content: "==Kacchi biryani== is the hardest — raw marinated meat and half-cooked rice cook __together__ under a sealed lid. Get the marinade and the seal right, or the whole handi is a lesson." },
        { type: "heading", content: "The marinade (mutton, 4–6 hrs minimum)" },
        {
          type: "code",
          language: "text",
          content: `Mutton (bone-in)     : 1 kg
Thick yogurt        : 1.5 cups
Ginger-garlic paste : 3 tbsp
Fried onions (birista): 1 cup (crushed)
Green chillies      : 5–6 slit
Red chilli powder   : 2 tsp
Turmeric            : 1/2 tsp
Garam masala        : 1.5 tsp
Salt                : 2 tsp
Lemon juice         : 3 tbsp
Mint + coriander    : 1/2 cup each, chopped
Ghee                : 3 tbsp
Saffron in warm milk: 1/4 tsp in 3 tbsp

Mix all, marinate 4–6 hrs (overnight is better).` ,
        },
        { type: "heading", content: "The rice (par-cooked, 70%)" },
        {
          type: "list",
          items: [
            "Basmati, aged, soaked 30 min.",
            "Boil water with **whole spices** (bay leaf, cardamom, cloves, cinnamon, star anise, shah jeera), salt heavily — 'seawater' salty.",
            "Add rice, cook until __70% done__ — grain breaks under fingernail with slight resistance. Drain fast.",
          ],
        },
        { type: "heading", content: "Layer + dum" },
        {
          type: "flow",
          title: "Handi assembly (bottom to top)",
          direction: "vertical",
          nodes: [
            { label: "Ghee smear", sub: "Coat handi base", tone: "coral" },
            { label: "Marinated meat", sub: "Even single layer", tone: "rose" },
            { label: "Rice layer", sub: "Cover meat completely", tone: "sky" },
            { label: "Saffron milk + ghee + birista + mint", sub: "The signature drizzle", tone: "coral" },
            { label: "Seal", sub: "Dough rope around lid OR foil + heavy lid", tone: "mint" },
            { label: "Dum", sub: "High 5 min → tawa under handi → low 40 min", tone: "rose" },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "==Rest 15 minutes off heat== before opening. Then open like a poet — one slow lift, catch the aroma, mix from the sides gently. Never stir hard: biryani is __layered, not mixed__.",
        },
      ],
    },
    {
      id: "chole-bhature",
      question: "Signature: Delhi-style Chole Bhature (the black-chole trick)",
      tags: ["Chole", "Delhi", "Signature"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "The famous ==dark, almost-black chole== color isn't food coloring — it's a __tea-bag trick__ every Delhi halwai uses. Here's the whole thing." },
        { type: "heading", content: "The chole" },
        {
          type: "list",
          ordered: true,
          items: [
            "Soak chickpeas overnight with 1/2 tsp baking soda.",
            "Pressure cook with **2 tea bags** (or 1 tbsp tea leaves in a muslin pouch) + a piece of dried amla + salt + bay leaf. This is the whole __color secret__.",
            "Separate: onion-tomato-ginger-garlic-green chilli paste, fried in ghee until it leaves oil.",
            "Add chole masala (anardana, kasuri methi, garam masala, amchur, black salt). Bhuno until dark.",
            "Add cooked chickpeas + cooking water. Simmer 15 min. Mash a few chickpeas — thickens the gravy naturally.",
            "Finish: __ginger juliennes, green chilli, lemon, coriander, a tadka of ghee + red chilli poured on top==.",
          ],
        },
        { type: "heading", content: "The bhature (soft, puffed, restaurant style)" },
        {
          type: "code",
          language: "text",
          content: `Maida            : 2 cups
Sooji (semolina) : 2 tbsp
Yogurt           : 3 tbsp
Sugar            : 1 tsp
Baking powder    : 1/2 tsp
Baking soda      : 1/4 tsp
Salt             : 3/4 tsp
Warm water/milk  : to knead
Oil              : 1 tbsp in dough + for frying

1. Knead soft, elastic dough. Rest 2–3 hrs (covered, warm).
2. Divide, roll into thick ovals — 3mm, no thinner.
3. Fry in HOT oil (190°C). Push under with slotted spoon — it puffs in 5 seconds.
4. Flip, 10 more seconds. Drain. Serve with hot chole, sliced onion, pickle.` ,
        },
      ],
    },
    {
      id: "mumbai-vada-pav",
      question: "Signature: Mumbai Vada Pav (the sabse tasty burger in the world)",
      tags: ["Vada Pav", "Mumbai", "Signature"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Three components, one bite. The pav is a __pillow__, the vada is a __spicy planet==, and the __dry garlic chutney__ is the whole reason people cross the city for one." },
        { type: "heading", content: "Batata vada (the fried potato ball)" },
        {
          type: "list",
          items: [
            "Boiled potatoes + tempering (mustard, curry leaves, ginger, green chilli, hing, turmeric).",
            "Add lemon + coriander. Cool. Shape into 40–50g balls.",
            "Batter: besan (1 cup) + rice flour (2 tbsp) + red chilli + salt + hing + baking soda + water — coating consistency.",
            "Dip, fry at 180°C until golden and hollow-tapping.",
          ],
        },
        { type: "heading", content: "Dry garlic-coconut chutney" },
        {
          type: "code",
          language: "text",
          content: `Dry coconut (grated) : 1/2 cup, roasted
Garlic cloves       : 10, roasted whole
Kashmiri chilli     : 2 tbsp powder
Peanuts (roasted)   : 2 tbsp
Sesame seeds        : 1 tbsp, roasted
Salt                : to taste

Pulse everything DRY in a blender — coarse, dusty, red.
This is the soul. No oil, no water — powder only.` ,
        },
        { type: "heading", content: "Assembly (the Mumbai way)" },
        {
          type: "list",
          ordered: true,
          items: [
            "Slit pav (don't split fully — one side stays hinged).",
            "Smear **green chutney** on the top half. Smear **imli chutney** on the bottom.",
            "Sprinkle **dry garlic chutney** generously — this is the flavor punch.",
            "Place the hot vada inside. Squeeze shut. Serve with a **fried green chilli** on the side.",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "==Toast the pav on a tawa with butter== for 20 seconds each side. The stall version is un-toasted; the elevated version is toasted. Both are correct — pick your religion.",
        },
      ],
    },
  ],
};

export const othersSection: Section = {
  slug: "others",
  title: "The Deep Cuts",
  tagline: "Beverages, sweets, techniques — the encore menu.",
  emoji: "❋",
  gradient: "from-[oklch(0.92_0.11_50)] via-[oklch(0.9_0.13_25)] to-[oklch(0.88_0.13_5)]",
  items: [
    {
      id: "masala-chai",
      question: "Masala chai the tapri way (in one paragraph, then the recipe).",
      tags: ["Chai", "Beverages"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "Tapri chai is __boiled, not steeped==. Water, spices, tea, sugar, milk — layered in that order, boiled hard, poured high. The froth is the __signature==." },
        {
          type: "code",
          language: "text",
          content: `Water           : 1 cup
Whole milk      : 1 cup
Fresh ginger    : 1 inch, crushed
Green cardamom  : 3, crushed
Black pepper    : 2 corns (optional, winter)
Cinnamon        : small piece
Fresh tea leaves: 2 tsp (Assam CTC works best)
Sugar           : 2 tsp

1. Boil water with ginger + spices, 3 min. It must smell strong.
2. Add tea, boil 1 min more — deep red-brown.
3. Add milk + sugar. Bring to boil TWICE, letting it rise-and-fall.
4. Strain from height into cups. Serve with rusk or khari.` ,
        },
        {
          type: "callout",
          variant: "info",
          content: "**Ginger is added early**, cardamom late. Reverse it and the ginger tastes raw while the cardamom disappears.",
        },
      ],
    },
    {
      id: "jalebi",
      question: "Why do my jalebis go soft in 10 minutes?",
      tags: ["Sweets", "Troubleshooting"],
      difficulty: "Medium",
      answer: [
        { type: "text", content: "Three reasons, in order: __syrup too thin__, __jalebi under-fried__, or __syrup too cold when dunking==. All fixable." },
        {
          type: "table",
          headers: ["Symptom", "Cause", "Fix"],
          rows: [
            ["Soggy in minutes", "Syrup one-string thin", "Cook to **1.5-string consistency**"],
            ["Pale, flabby", "Fried too briefly", "Fry until deep amber, crackle when tapped"],
            ["No crunch", "Syrup cold on hot jalebi", "Syrup should be **warm** (60°C), jalebi hot"],
            ["No fermentation twang", "No overnight rest OR skipped yeast/curd", "Ferment batter 8–12 hrs"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          content: "The dunk is a __3-second flip==. Any longer and the jalebi drinks too much syrup and dies. Lift, drain, plate — that's it.",
        },
      ],
    },
    {
      id: "tempering-tadka",
      question: "Tadka (tempering) — the whole science in one card.",
      tags: ["Technique", "Fundamentals"],
      difficulty: "Easy",
      answer: [
        { type: "text", content: "==Tadka== is the finishing move where whole spices bloom in hot fat and hit the dish. It's the difference between __food__ and __your grandmother's food__." },
        {
          type: "flow",
          title: "The universal tadka order",
          direction: "vertical",
          nodes: [
            { label: "Hot ghee/oil", sub: "Shimmering, not smoking", tone: "coral" },
            { label: "Mustard seeds", sub: "Wait for the pop", tone: "rose" },
            { label: "Cumin / methi", sub: "5 seconds — golden", tone: "coral" },
            { label: "Dried red chilli", sub: "Curl and darken", tone: "rose" },
            { label: "Curry leaves + hing", sub: "One splutter, off heat", tone: "mint" },
            { label: "Pour over dish", sub: "Immediately, listen for hiss", tone: "sky" },
          ],
        },
        {
          type: "callout",
          variant: "warn",
          content: "==Never let mustard seeds burn.== Bitter mustard poisons the whole tadka. If they're not popping, oil isn't hot enough. If they're smoking, you're 3 seconds too late.",
        },
        {
          type: "links",
          items: [
            { href: "https://en.wikipedia.org/wiki/Tadka_(cooking)", label: "Tadka — Wikipedia", description: "The technique across regional Indian cuisines." },
          ],
        },
      ],
    },
  ],
};

export const chaatSections: Section[] = [
  qansSection,
  programsSection,
  realtimeSection,
  projectsSection,
  othersSection,
];
