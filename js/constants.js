(function (Game) {
  'use strict';

  // All tunable game numbers live here, so balancing the game never
  // requires touching the phase logic itself.
  Game.CONFIG = Object.freeze({
    STARTING_MONEY: 500,
    STARTING_LOAN: 3000,
    LOAN_INTEREST_RATE: 0.05,
    LOAN_INSTALLMENT: 300,

    STARTING_LAND_HECTARES: 2,
    MAX_DENSITY_KG_PER_HECTARE: 2000,

    SEED_PRICE_PER_KG: 0.5,
    STARTING_SEED_STOCK_KG: 400,

    YIELD_MULTIPLIER_MIN: 6,
    YIELD_MULTIPLIER_MAX: 10,

    DEMAND_BASE_KG: 3000,
    DEMAND_PRICE_SENSITIVITY: 2000,
    REFERENCE_PRICE: 0.4,

    FOOD_COST_PER_YEAR: 400,
    LAND_TAX_PER_HECTARE: 50,
    TOOL_MAINTENANCE_COST: 50,

    STARTING_AGE: 20,
    MIN_DEATH_AGE: 60,
    DEATH_PROBABILITY_STEP: 0.03
  });
})(window.Game = window.Game || {});
