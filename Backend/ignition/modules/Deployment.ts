import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeploymentModule = buildModule("DeploymentModule", (m) => {

    const CarbonNexToken = m.contract("CarbonNexToken");
    const ICO = m.contract("ICO", [CarbonNexToken]);

    const owner = m.getAccount(0);
    const totalSupply = m.staticCall(CarbonNexToken, "totalSupply");
    m.call(CarbonNexToken, 'approve', [ICO, totalSupply], {
        from: owner
    })
    return { CarbonNexToken, ICO };
});

export default DeploymentModule;