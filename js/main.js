(function (Game) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const config = Game.CONFIG;

    const dependencies = {
      sowingPhase: new Game.SowingPhase(config),
      harvestPhase: new Game.HarvestPhase(config),
      sellingPhase: new Game.SellingPhase(config),
      preparationPhase: new Game.PreparationPhase(config)
    };

    const engine = new Game.GameEngine(config, dependencies);
    const root = document.getElementById('app');
    const ui = new Game.UIController(engine, root);

    ui.render();
  });
})(window.Game = window.Game || {});
