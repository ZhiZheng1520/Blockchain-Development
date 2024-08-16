import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeploymentModule = buildModule("DeploymentModule", (m) => {
    const CarbonNexToken = m.contract("CarbonNexToken");
    return { CarbonNexToken };
});

export default DeploymentModule;