import { resolve } from "dns";
import { useMessage } from "../context/MessageContext";
export const joinClasses = (...classes: string[]) => {
    return classes.join(" ");
};
export const getTruncatedAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
};
