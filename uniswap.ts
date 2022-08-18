import { ethers } from "hardhat";

async function main() {
    // interact with uniswap function

    const USDTaddr = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const DAIaddr = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const UNIRouter = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
    const USDTHolder = "0x974CaA59e49682CdA0AD2bbe82983419A2ECC400";
    const amountOut = 2000;


    const helpers = require("@nomicfoundation/hardhat-network-helpers");
    await helpers.impersonateAccount(USDTHolder);
    const impersonatedSigner = await ethers.getSigner(USDTHolder);

    const USDT = await ethers.getContractAt("IERC20", USDTaddr, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC20", DAIaddr);
    const ROUTER = await ethers.getContractAt(
        "IUniswap",
        UNIRouter,
        impersonatedSigner
    );

    await USDT.approve(UNIRouter, amountOut);
    const usdtBal = await USDT.balanceOf(USDTHolder);
    const daiBal = await DAI.balanceOf(USDTHolder);

    console.log("The Balance Before Swap ✅", usdtBal, daiBal);

    await ROUTER.swapTokensForExactTokens(
        amountOut,
        2000,
        [USDTaddr, DAIaddr],
        USDTHolder,
        1660994129
    );

    const usdtBalAfter = await USDT.balanceOf(USDTHolder);
    const daiBalAfter = await DAI.balanceOf(USDTHolder);

    console.log("balance after swap✅✅", usdtBalAfter, daiBalAfter);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
