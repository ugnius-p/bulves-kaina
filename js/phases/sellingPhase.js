(function (Game) {
  'use strict';

  // Phase 3: Pardavimas — player sets a price, demand (and so revenue)
  // follows from it.
  class SellingPhase {
    constructor(config) {
      this.config = config;
    }

    calculateDemandKg(pricePerKg) {
      const { DEMAND_BASE_KG, DEMAND_PRICE_SENSITIVITY, REFERENCE_PRICE } = this.config;
      const priceDelta = pricePerKg - REFERENCE_PRICE;
      const demand = DEMAND_BASE_KG - priceDelta * DEMAND_PRICE_SENSITIVITY;
      return Math.max(0, Math.round(demand));
    }

    execute(state, pricePerKg) {
      const safePrice = Math.max(0, pricePerKg);
      const demandKg = this.calculateDemandKg(safePrice);
      const soldKg = Math.min(state.unsoldKg, demandKg);
      const revenue = soldKg * safePrice;

      state.unsoldKg -= soldKg;
      state.money += revenue;

      return { soldKg, revenue, demandKg, unsoldKg: state.unsoldKg };
    }
  }

  Game.SellingPhase = SellingPhase;
})(window.Game = window.Game || {});
