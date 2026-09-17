(function (Game) {
  'use strict';

  const PHASES = Object.freeze(['sowing', 'harvest', 'selling', 'preparation']);

  // Knows only the ORDER of phases and how to dispatch to each one.
  // Contains no game-balance logic itself — that all lives in the
  // individual phase classes.
  class GameEngine {
    constructor(config, dependencies) {
      this.config = config;
      this.state = new Game.GameState(config);

      this.sowingPhase = dependencies.sowingPhase;
      this.harvestPhase = dependencies.harvestPhase;
      this.sellingPhase = dependencies.sellingPhase;
      this.preparationPhase = dependencies.preparationPhase;

      this.currentPhaseIndex = 0;
    }

    get currentPhase() {
      return PHASES[this.currentPhaseIndex];
    }

    submit(input) {
      let result;

      switch (this.currentPhase) {
        case 'sowing':
          result = this.sowingPhase.execute(this.state, input);
          break;
        case 'harvest':
          result = this.harvestPhase.execute(this.state);
          break;
        case 'selling':
          result = this.sellingPhase.execute(this.state, input);
          break;
        case 'preparation':
          result = this.preparationPhase.execute(this.state, input);
          break;
        default:
          throw new Error(`Unknown phase: ${this.currentPhase}`);
      }

      if (!this.state.isGameOver) {
        this.currentPhaseIndex = (this.currentPhaseIndex + 1) % PHASES.length;
      }

      return result;
    }
  }

  Game.GameEngine = GameEngine;
  Game.PHASES = PHASES;
})(window.Game = window.Game || {});
