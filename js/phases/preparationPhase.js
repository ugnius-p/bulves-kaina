(function (Game) {
  'use strict';

  // Phase 4: Pasiruošimas — pay off loan/tax/food/tools, optionally
  // reinvest leftover money into more seed stock, then age one year
  // and check whether the player survives to the next cycle.
  class PreparationPhase {
    constructor(config, randomFn) {
      this.config = config;
      this.random = randomFn || Math.random;
    }

    calculateExpenses(state) {
      const {
        LOAN_INTEREST_RATE, LOAN_INSTALLMENT, LAND_TAX_PER_HECTARE,
        TOOL_MAINTENANCE_COST, FOOD_COST_PER_YEAR
      } = this.config;

      const interest = state.loanBalance * LOAN_INTEREST_RATE;
      const loanPayment = state.loanBalance > 0
        ? Math.min(state.loanBalance + interest, LOAN_INSTALLMENT + interest)
        : 0;
      const landTax = state.landHectares * LAND_TAX_PER_HECTARE;

      return {
        interest,
        loanPayment,
        landTax,
        toolMaintenance: TOOL_MAINTENANCE_COST,
        food: FOOD_COST_PER_YEAR
      };
    }

    execute(state, investmentKg) {
      const expenses = this.calculateExpenses(state);
      const totalExpenses = expenses.loanPayment + expenses.landTax +
        expenses.toolMaintenance + expenses.food;

      state.loanBalance = Math.max(0, state.loanBalance + expenses.interest - expenses.loanPayment);
      state.money -= totalExpenses;

      const investCost = investmentKg * this.config.SEED_PRICE_PER_KG;
      const actualInvestmentKg = (investmentKg > 0 && state.money >= investCost)
        ? investmentKg
        : 0;
      if (actualInvestmentKg > 0) {
        state.money -= investCost;
        state.seedStockKg += actualInvestmentKg;
      }

      state.age += 1;
      state.yearCount += 1;

      let died = false;
      if (state.age > this.config.MIN_DEATH_AGE) {
        const yearsOver = state.age - this.config.MIN_DEATH_AGE;
        const deathChance = Math.min(0.95, yearsOver * this.config.DEATH_PROBABILITY_STEP);
        died = this.random() < deathChance;
      }
      state.isDead = died;

      return { expenses, totalExpenses, investedKg: actualInvestmentKg, died };
    }
  }

  Game.PreparationPhase = PreparationPhase;
})(window.Game = window.Game || {});
