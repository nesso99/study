import { expect } from "chai";
import { BigNumber } from "ethers";
import hre from "hardhat";

describe("Calldata", async () => {
  it("Should set number successfully", async function () {
    const [owner] = await hre.ethers.getSigners();
    const Calldata = await hre.ethers.getContractFactory("Calldata");
    const calldataInstance = await Calldata.deploy();

    const storeABI = ["function store()"];
    const storeNumberABI = ["function store(uint128 number)"];
    let storeIface = new hre.ethers.utils.Interface(storeABI);
    let storeNumberIface = new hre.ethers.utils.Interface(storeNumberABI);
    const number = 123;
    const storeCallData = storeIface.encodeFunctionData("store", []);
    const storeNumberCallData = storeNumberIface.encodeFunctionData("store", [
      number,
    ]);
    const data = storeCallData + storeNumberCallData.substring(10);

    await owner.sendTransaction({ to: calldataInstance.address, data });

    const retrieveNumber: BigNumber = await calldataInstance.retrieve();
    expect(retrieveNumber.toString()).equal(number.toString());
  });
});
