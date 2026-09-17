(function (Game) {
  'use strict';

  // Phase 1: Sėjimas — player decides how many kg of potatoes to plant.
  class SowingPhase {
    constructor(config) {
      this.config = config;
    }

    getMaxPlantableKg(state) {
      const landCapacity = state.landHectares * this.config.MAX_DENSITY_KG_PER_HECTARE;
      return Math.min(landCapacity, state.seedStockKg);
    }

    execute(state, requestedKg) {
      const maxPlantable = this.getMaxPlantableKg(state);
      const plantedKg = Math.max(0, Math.min(requestedKg, maxPlantable));

      state.seedStockKg -= plantedKg;
      state.plantedKg = plantedKg;

      return { plantedKg, maxPlantable };
    }
  }

  Game.SowingPhase = SowingPhase;
})(window.Game = window.Game || {});
