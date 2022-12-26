const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    // get an array of all accounts that hardhat sets up for us
    const accounts = await ethers.getSigners();

    return { game, accounts };
  }
  it("should be a winner", async function () {
    const { game, accounts } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}

    // set the mapping of account 1 to be connected to account 0

    await game.connect(accounts[0]).write(accounts[1].address);

    // call the win function with account 1 and use account 0 as the functions argument

    await game.connect(accounts[1]).win(accounts[0].address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
