const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    const accounts = await ethers.getSigners();

    return { game, accounts };
  }
  it("should be a winner", async function () {
    const { game, accounts } = await loadFixture(deployContractAndSetVariables);

    // account with ETH that will send some ETH to the newly created account
    const oldAccount = accounts[0];
    // placeholder for the amount of ETH the old account will send to the new acccount
    const value = ethers.utils.parseEther("1.0");
    let found = false;

    // creatting new accounts until one account matches the criteria to win
    while (!found) {
      // creat new account
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      //check if the account address matches the condition to win (starts with 0x00")
      if (wallet.address.substring(2, 4) == "00") {
        const to = wallet.address;
        await oldAccount.sendTransaction({ to, value });
        await game.connect(wallet).win();
        found = true;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
