(function (Game) {
  'use strict';

  // Only responsible for turning current engine state into DOM, and
  // routing DOM events back into the engine. No game rules here.
  class UIController {
    constructor(engine, rootElement) {
      this.engine = engine;
      this.root = rootElement;
    }

    render() {
      if (this.engine.state.isGameOver) {
        this.renderGameOver();
        return;
      }

      switch (this.engine.currentPhase) {
        case 'sowing':
          this.renderSowing();
          break;
        case 'harvest':
          this.renderHarvest();
          break;
        case 'selling':
          this.renderSelling();
          break;
        case 'preparation':
          this.renderPreparation();
          break;
      }
    }

    renderStatusBar() {
      const s = this.engine.state;
      return `
        <div class="status-bar">
          <span>Metai: ${s.yearCount}</span>
          <span>Amžius: ${s.age}</span>
          <span>Pinigai: ${s.money.toFixed(2)} €</span>
          <span>Paskola: ${s.loanBalance.toFixed(2)} €</span>
          <span>Žemė: ${s.landHectares} ha</span>
          <span>Sėklos atsargos: ${s.seedStockKg} kg</span>
        </div>
      `;
    }

    renderSowing() {
      const max = this.engine.sowingPhase.getMaxPlantableKg(this.engine.state);
      this.root.innerHTML = `
        ${this.renderStatusBar()}
        <section>
          <h2>Sėjimas</h2>
          <p>Kiek kilogramų bulvių sėsi? (maks. ${max} kg)</p>
          <input type="number" id="input-value" min="0" max="${max}" value="${max}" />
          <button id="submit-btn">Sėti</button>
        </section>
      `;
      this.bindSubmit(() => Number(document.getElementById('input-value').value));
    }

    renderHarvest() {
      this.root.innerHTML = `
        ${this.renderStatusBar()}
        <section>
          <h2>Bulviakasys</h2>
          <p>Metas kasti bulves ir sužinoti derlių!</p>
          <button id="submit-btn">Kasti</button>
        </section>
      `;
      this.bindSubmit(
        () => null,
        (result) => alert(`Iškasei ${result.harvestedKg} kg bulvių!`)
      );
    }

    renderSelling() {
      const s = this.engine.state;
      this.root.innerHTML = `
        ${this.renderStatusBar()}
        <section>
          <h2>Pardavimas</h2>
          <p>Turimas kiekis: ${s.unsoldKg} kg</p>
          <label for="input-value">Kaina už kg (€)</label>
          <input type="number" id="input-value" min="0" step="0.01" value="0.40" />
          <button id="submit-btn">Parduoti</button>
        </section>
      `;
      this.bindSubmit(
        () => Number(document.getElementById('input-value').value),
        (result) => alert(
          `Parduota ${result.soldKg} kg už ${result.revenue.toFixed(2)} €. ` +
          `Liko neparduota: ${result.unsoldKg} kg.`
        )
      );
    }

    renderPreparation() {
      this.root.innerHTML = `
        ${this.renderStatusBar()}
        <section>
          <h2>Pasiruošimas</h2>
          <p>Sumokėk mokesčius ir investuok likusius pinigus į papildomas sėklas.</p>
          <label for="input-value">Investuoti į sėklas (kg)</label>
          <input type="number" id="input-value" min="0" value="0" />
          <button id="submit-btn">Tęsti</button>
        </section>
      `;
      this.bindSubmit(
        () => Number(document.getElementById('input-value').value),
        (result) => {
          const e = result.expenses;
          alert(
            `Išlaidos: paskola ${e.loanPayment.toFixed(2)} €, žemės mokestis ${e.landTax.toFixed(2)} €, ` +
            `įrankiai ${e.toolMaintenance.toFixed(2)} €, maistas ${e.food.toFixed(2)} €. ` +
            `Investuota ${result.investedKg} kg sėklų.`
          );
        }
      );
    }

    renderGameOver() {
      const s = this.engine.state;
      const reason = s.isBankrupt ? 'Bankrutavai.' : 'Mirei.';
      this.root.innerHTML = `
        <section>
          <h2>Žaidimas baigtas</h2>
          <p>${reason}</p>
          <p>Išgyventa metų: ${s.yearCount}</p>
        </section>
      `;
    }

    bindSubmit(getInput, onResult) {
      const btn = document.getElementById('submit-btn');
      btn.addEventListener('click', () => {
        const input = getInput();
        const result = this.engine.submit(input);
        if (onResult) onResult(result);
        this.render();
      });
    }
  }

  Game.UIController = UIController;
})(window.Game = window.Game || {});
