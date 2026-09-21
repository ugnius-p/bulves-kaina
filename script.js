class AbstractSingleton {
  constructor() {
    if (new.target === AbstractSingleton) {
      throw new Error("AbstractSingleton is an abstract class and cannot be instantiated directly.");
    }

    const ClassRef = this.constructor;
    if (!ClassRef._allowInstantiation) {
      throw new Error(`Cannot instantiate ${ClassRef.name} directly with 'new'. Use ${ClassRef.name}.getInstance() instead.`);
    }
  }

  static getInstance(...args) {
    if (!this._instance) {
      this._allowInstantiation = true;
      this._instance = new this(...args);
      delete this._allowInstantiation;
    }
    return this._instance;
  }
}


class Expense{
    constructor(name, price, duration) {
        this.name = name;
        this.price = price;
        this.duration = duration;
    }

    pay() {
        if (this.duration > 0) {
            this.duration -= 1;
           return [this.name, this.price];
        } else {
            return [this.name, -1];
        }
    }
}

class GameData extends AbstractSingleton{
    constructor() {
        this.age = 20;
        this.money = 3000;
        this.potatoes = 0;
        this.potatoSeeds = 400;
        this.potatoesPlanted = 0;
        this.expenses = [];
    }
}

class Sowing{
    constructor() {
        this.gameData = GameData();
    }

    sow(potatoesToSow) {
        if (potatoesToSow > this.gameData.potatoSeeds) {
            throw new Error(`Can't plant more potatoes, than there are potatoe seeds. Trying to plant: ${potatoesToSow}, have: ${this.gameData.potatoSeeds}`);
        } else if (potatoesToSow < 0) {
            throw new Error(`Can't sow less than 0 potatoes. Trying to sow: ${potatoesToSow} potatoes.`);
        } else {
            this.gameData.potatoSeeds = 0;
            this.gameData.potatoesPlanted = potatoesToSow;
        }
    }
}

class Harvesting{
    constructor() {
        this.gameData = GameData()
    }
    harvest() {
        this.gameData.potatoes = this.gameData.potatoesPlanted * this.harvestMultiplier();
        this.potatoesPlanted = 0;
    }
}

class Selling{
    constructor() {
        this.gameData = GameData();
    }

    potatoeSellRatio(price) {
        //Add potato demand logic
        return 1;
    }

    sell(price) {
        potatoesSold = this.gameData.potatoes*this.potatoeSellRatio(price);
        this.gameData.potatoes -= potatoesSold;
        this.gameData.money += potatoesSold*price;
    }
}

class Accounting{
    constructor() {
        this.gameData = GameData();
    }

    expensesList() {
        let list = [];
        this.gameData.expenses.forEach(expense => {
            if (expense.pay()[1] < 0) {
                const index = this.gameData.expenses.indexOf(expense);
                if (index !== -1) {
                    array.splice(index, 1);
                }
            } else {
                list.push(expense);
            }
        });
        return list;
    }
}

class Preparation{
    constructor() {
        this.gameData = GameData();
    }

    potatoSeedPrice() {
        return 0.4;
    }

    buySeeds(money) {
        this.gameData.money -= money;
        this.gameData.potatoSeeds = money / potatoSeedPrice();
    }
}