import { SimulationResult, Contract } from './types';

export const MOCK_SIMULATIONS: Record<string, SimulationResult> = {
  token_transfer: {
    success: true,
    gasUsed: 2847,
    gasCostMOVE: "0.002847",
    gasCostUSD: "$0.0085",
    executionTime: 234,
    message: "Transfer would succeed! ✅",
    stateChanges: [
      {
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
        resource: "0x1::coin::CoinStore<MOVE>",
        field: "balance",
        before: "1000000000",
        after: "999900000",
        change: "-100000",
        changeFormatted: "-0.1 MOVE"
      },
      {
        address: "0x8123a1f2b3c4d5e6f7890abcdef123456",
        resource: "0x1::coin::CoinStore<MOVE>",
        field: "balance",
        before: "500000000",
        after: "500100000",
        change: "+100000",
        changeFormatted: "+0.1 MOVE"
      }
    ],
    events: [
      {
        type: "0x1::coin::WithdrawEvent",
        guid: "0x742d...",
        sequence: "42",
        data: { amount: "100000" }
      },
      {
        type: "0x1::coin::DepositEvent",
        guid: "0x8123...",
        sequence: "17",
        data: { amount: "100000" }
      }
    ],
    gasBreakdown: {
      computation: 1200,
      storage: 847,
      network: 800
    }
  },
  
  nft_mint: {
    success: true,
    gasUsed: 5432,
    gasCostMOVE: "0.005432",
    gasCostUSD: "$0.0162",
    executionTime: 412,
    message: "NFT Minted Successfully! 🎨",
    stateChanges: [
      {
        address: "0xNFT_COLLECTION_ADDRESS",
        resource: "0x3::token::Collections",
        field: "total_minted",
        before: "42",
        after: "43",
        change: "+1"
      },
      {
        address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
        resource: "0x3::token::TokenStore",
        field: "tokens",
        before: "[]",
        after: "[TokenId(43)]",
        change: "+1 NFT"
      }
    ],
    events: [
      {
        type: "0x3::token::MintTokenEvent",
        data: {
          token_id: "43",
          owner: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
          collection: "CoolApes"
        }
      }
    ],
    gasBreakdown: {
      computation: 2100,
      storage: 2532,
      network: 800
    }
  },
  
  failed_insufficient_balance: {
    success: false,
    gasUsed: 1200,
    gasCostMOVE: "0.001200",
    gasCostUSD: "$0.0036",
    executionTime: 145,
    error: {
      type: "INSUFFICIENT_BALANCE",
      code: 65542,
      message: "Sender account doesn't have sufficient balance to complete transfer",
      location: "0x1::coin::withdraw",
      line: 156,
      suggestion: "Check sender balance before attempting transfer. Current balance: 0.05 MOVE, Required: 0.1 MOVE"
    },
    stateChanges: [],
    events: []
  },
  
  failed_access_denied: {
    success: false,
    gasUsed: 980,
    gasCostMOVE: "0.000980",
    gasCostUSD: "$0.0029",
    executionTime: 98,
    error: {
      type: "PERMISSION_DENIED",
      code: 65537,
      message: "Caller does not have permission to execute this function",
      location: "0x123::admin::mint_tokens",
      line: 42,
      suggestion: "This function requires admin privileges. Only contract owner can call this."
    },
    securityWarning: "HIGH: Missing access control check detected",
    stateChanges: [],
    events: []
  }
};

export const DEMO_CONTRACTS: Contract[] = [
  {
    address: "0x1",
    name: "MOVE Coin (Native Token)",
    description: "Native Movement blockchain token",
    functions: [
      {
        name: "transfer",
        module: "coin",
        fullName: "0x1::coin::transfer",
        params: [
          { name: "to", type: "address", example: "0x8123..." },
          { name: "amount", type: "u64", example: "100000000" }
        ],
        description: "Transfer MOVE tokens to another address",
        mockKey: "token_transfer"
      }
    ]
  },
  {
    address: "0x3",
    name: "Token Standard (NFTs)",
    description: "Movement NFT token standard",
    functions: [
      {
        name: "mint_token",
        module: "token",
        fullName: "0x3::token::mint_token",
        params: [
          { name: "collection_name", type: "string", example: "CoolApes" },
          { name: "token_name", type: "string", example: "Ape #43" },
          { name: "uri", type: "string", example: "ipfs://..." }
        ],
        description: "Mint a new NFT token",
        mockKey: "nft_mint"
      }
    ]
  },
  {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    name: "Demo DeFi Contract",
    description: "Example DeFi protocol for testing",
    functions: [
      {
        name: "swap",
        module: "dex",
        fullName: "0x742d35::dex::swap",
        params: [
          { name: "token_in", type: "address", example: "0x1" },
          { name: "token_out", type: "address", example: "0x2" },
          { name: "amount_in", type: "u64", example: "1000000" }
        ],
        description: "Swap tokens on DEX",
        mockKey: "token_transfer"
      }
    ]
  }
];
