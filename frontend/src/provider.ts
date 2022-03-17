/* eslint-disable prettier/prettier */
import { providers } from "ethers";
type Provider = providers.Web3Provider;
export const getProvider = async () => {
    let provider: Provider;
    if (
        typeof window !== "undefined" &&
        typeof (window as any).ethereum !== "undefined"
    ) {
        provider = new providers.Web3Provider(
            (window as any).ethereum
        ) as Provider;
    } else {
        throw new Error("web 3 provider not available");
    }
    return provider;
};
export const getSignerAddress = async () => {
    try {
        const provider = await getProvider();
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        return signerAddress;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getSigner = async () => {
    try {
        const provider: Provider = await getProvider();
        const signer = provider.getSigner();
        return signer;
    } catch (err) {
        console.log(err);
        return null;
    }
};
