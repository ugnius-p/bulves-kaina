(function (Game) {
  'use strict';

  // Phase 2: Bulviakasys — planted potatoes turn into a harvest, with
  // some randomness standing in for weather/soil variance.
  class HarvestPhase {
    constructor(config, randomFn) {
      this.config = config;
      this.random = randomFn || Math.random;
    }

    execute(state) {
      const { YIELD_MULTIPLIER_MIN, YIELD_MULTIPLIER_MAX } = this.config;
      const multiplier = YIELD_MULTIPLIER_MIN +
        this.random() * (YIELD_MULTIPLIER_MAX - YIELD_MULTIPLIER_MIN);

      const harvestedKg = Math.round(state.plantedKg * multiplier);
      state.harvestedKg = harvestedKg;
      state.unsoldKg = harvestedKg;

      return { harvestedKg, multiplier };
    }
  }

  Game.HarvestPhase = HarvestPhase;
})(window.Game = window.Game || {});
