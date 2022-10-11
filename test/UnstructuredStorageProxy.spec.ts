import { expect } from "chai";
import { BigNumber, utils } from "ethers";
import hre from "hardhat";

describe("UnstructuredStorageProxy", async () => {
  it("getACLRole5999294130779334338 will return wrong", async function () {
    const [owner, attacker] = await hre.ethers.getSigners();
    const ACL = await hre.ethers.getContractFactory("ACL");
    const Vault = await hre.ethers.getContractFactory("Vault");
    const UnstructuredStorageProxy = await hre.ethers.getContractFactory(
      "UnstructuredStorageProxy"
    );

    const aclInstance = await ACL.deploy();
    const aclProxyInstance = await UnstructuredStorageProxy.deploy(
      aclInstance.address
    );
    const vaultInstance = await Vault.deploy();
    const vaultProxyInstance = await UnstructuredStorageProxy.deploy(
      vaultInstance.address
    );

    console.log("msg.sig");
    const ABI = ["proxyOwner()", "getACLRole5999294130779334338()"];
    for (const abi of ABI) {
      console.log(abi);
      console.log(utils.id(abi).substring(0, 10));
    }
    // proxyOwner and getACLRole5999294130779334338 have the same hash 0x025313a2

    const aclProxy = await ACL.attach(aclProxyInstance.address);
    const vaultProxy = await Vault.attach(vaultProxyInstance.address);
    await aclProxy.setACLRole7123909213907581092(owner.address);
    await aclProxy.setACLRole8972381298910001230(owner.address);
    await aclProxy.setACLRole5999294130779334338(owner.address);
    await vaultProxy.setACL(aclProxy.address);

    // attacker claim the role
    await aclProxy
      .connect(attacker)
      .setACLRole7123909213907581092(attacker.address);
    await aclProxy
      .connect(attacker)
      .setACLRole8972381298910001230(attacker.address);
    await aclProxy
      .connect(attacker)
      .setACLRole5999294130779334338(attacker.address);

    // but this function does not return attacker address =))
    const aclRole5999294130779334338 =
      await aclProxy.getACLRole5999294130779334338();
    expect(aclRole5999294130779334338).not.equal(attacker.address);
    expect(aclRole5999294130779334338).equal(owner.address);
  });
});
