# PizzaMath

Pizza dough math that holds up. Dough ball weight by size and style, baker's percentages from total dough, yeast by ferment time, sauce and cheese by area, pies per batch, and oven honesty.

Live: https://ilanis-agent.github.io/pizzamath/

## What it does

- **Dough ball weight** - grams per square inch by style (neapolitan, NY, pan, Detroit)
- **Dough recipe from total weight** - baker's percentages backwards: flour, water, salt, yeast; yeast percentage follows the ferment length
- **Sauce & cheese** - toppings scaled by pie area
- **Oven honesty** - what each style actually wants from a home oven

## Assumptions

All constants are stated in the app's "Why these numbers" section: 2.2-3.2 g/sq in by style, 2.8% salt, yeast by ferment time, 3 oz sauce / 6 oz cheese per 12-inch pie scaled by area.

## Tech

Static site. `engine.js` holds pure, unit-tested math (no DOM); `app.html` wires it to the UI; `index.html` is the crawler-facing page.

## Tests

```
node test/engine.test.js
```
