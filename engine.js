/* PizzaMath engine - honest pizza dough math. Pure functions, no DOM. */
var PizzaEngine = (function () {
  function r1(x) { return Math.round(x * 10) / 10; }

  /* ball weight: grams per square inch of pie, by style */
  var G_PER_SQIN = { neapolitan: 2.2, ny: 2.4, pan: 3.2, detroit: 3.2 };
  function ballGrams(diameterIn, style) {
    var g = G_PER_SQIN[style];
    if (!g) return null;
    return Math.round(Math.PI * Math.pow(diameterIn / 2, 2) * g);
  }

  /* dough ingredients from total dough weight, baker's percentages */
  function doughIngredients(totalDoughG, hydrationPct, saltPct, yeastPct) {
    var flour = totalDoughG / (1 + hydrationPct / 100 + saltPct / 100 + yeastPct / 100);
    return {
      flourG: r1(flour),
      waterG: r1(flour * hydrationPct / 100),
      saltG: r1(flour * saltPct / 100),
      yeastG: r1(flour * yeastPct / 100)
    };
  }

  /* instant yeast percent by planned ferment time at room temp (~70F) */
  function yeastPctFor(hours) {
    if (hours <= 2) return 0.6;
    if (hours <= 8) return 0.3;
    if (hours <= 24) return 0.15;
    if (hours <= 48) return 0.1;
    return 0.08;
  }
  function fermentVerdict(hours) {
    if (hours < 2) return 'rushed - under 2 hours is edible bread, not pizza flavor';
    if (hours <= 8) return 'same-day - decent; flavor develops but stays simple';
    if (hours <= 48) return 'cold-ferment territory - 24-48h in the fridge is where real flavor lives';
    return 'long game - past 48h the dough gets extensible and funky; watch for overproofing';
  }

  /* toppings scale with area, relative to a 12in pie (3 oz sauce, 6 oz cheese) */
  function sauceOz(diameterIn) { return r1(3 * Math.pow(diameterIn / 12, 2)); }
  function cheeseOz(diameterIn) { return r1(6 * Math.pow(diameterIn / 12, 2)); }

  /* how many pies from a batch of dough */
  function pizzaCount(totalDoughG, ballG) {
    if (ballG <= 0) return null;
    return Math.floor(totalDoughG / ballG);
  }

  /* oven honesty */
  var OVEN_NOTES = {
    neapolitan: 'Wants 800F+ and 90 seconds - a home oven at max with a steel gets you close, not equal.',
    ny: 'Home-oven friendly: 500-550F on a steel or stone, 6-8 minutes.',
    pan: '475-500F, oiled pan, 12-15 minutes. The crispy edge is the point.',
    detroit: '475-500F in a well-oiled steel pan; cheese to the edges for the frico crust.'
  };
  function ovenNote(style) { return OVEN_NOTES[style] || null; }

  return {
    G_PER_SQIN: G_PER_SQIN, ballGrams: ballGrams, doughIngredients: doughIngredients,
    yeastPctFor: yeastPctFor, fermentVerdict: fermentVerdict,
    sauceOz: sauceOz, cheeseOz: cheeseOz, pizzaCount: pizzaCount, ovenNote: ovenNote
  };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = PizzaEngine;
