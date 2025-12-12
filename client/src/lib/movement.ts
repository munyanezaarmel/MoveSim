import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Initialize Aptos client for Movement Testnet
// Note: In a real app we might want to let user configure the RPC
const config = new AptosConfig({
  network: Network.TESTNET,
  fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1", // Using public endpoint for now
});

export const aptos = new Aptos(config);
