(function (Game) {
  'use strict';

  // Holds the mutable state of a single playthrough. Phases read from
  // and write to this object but contain no state of their own.
  class GameState {
    constructor(config) {
      this.money = config.STARTING_MONEY;
      this.loanBalance = config.STARTING_LOAN;
      this.landHectares = config.STARTING_LAND_HECTARES;
      this.seedStockKg = config.STARTING_SEED_STOCK_KG;

      this.plantedKg = 0;
      this.harvestedKg = 0;
      this.unsoldKg = 0;

      this.age = config.STARTING_AGE;
      this.yearCount = 0;

      this.isDead = false;
    }

    get isBankrupt() {
      return this.money < 0;
    }

    get isGameOver() {
      return this.isBankrupt || this.isDead;
    }
  }

  Game.GameState = GameState;
})(window.Game = window.Game || {});
