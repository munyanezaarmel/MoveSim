export interface Vulnerability {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  line: number;
  title: string;
  description: string;
  suggestion: string;
}

export function analyzeMoveCode(code: string): Vulnerability[] {
  const issues: Vulnerability[] = [];
  const lines = code.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // 1. Check for Hardcoded Addresses
    // Regex looks for 0x followed by hex chars, ignoring 0x1 (std lib)
    if (line.match(/0x[a-fA-F0-9]{4,}/) && !line.includes('const') && !line.trim().startsWith('//')) {
      issues.push({
        severity: "MEDIUM",
        line: lineNum,
        title: "Hardcoded Address Detected",
        description: "Storing addresses directly in code limits portability.",
        suggestion: "Pass addresses as arguments or store them in a configuration resource."
      });
    }

    // 2. Check for Missing Access Control (Naïve check)
    // Looks for public functions that write to storage but don't seem to check a signer/owner
    if (line.includes('public fun') && !line.includes('entry') && (code.includes('borrow_global_mut') || code.includes('move_to'))) {
      // This is a complex check to mock, so we check if the function body (simplified) lacks an assert
      // We'll just flag "public fun" that looks suspicious in this mock context
       if (line.includes('withdraw') || line.includes('mint') || line.includes('transfer')) {
         if (!code.slice(index).includes('assert!')) {
            issues.push({
              severity: "CRITICAL",
              line: lineNum,
              title: "Missing Access Control",
              description: "Critical function defined without visible assertions or authorization checks.",
              suggestion: "Add 'assert!(signer::address_of(account) == @admin, E_NOT_AUTHORIZED);' at the start."
            });
         }
       }
    }

    // 3. Unchecked Arithmetic (Move < 2.0 specific, but good for demo)
    // If we see math operations without visible overflow protection or libraries
    if ((line.includes(' + ') || line.includes(' - ') || line.includes(' * ')) && !line.trim().startsWith('//')) {
       // Mock warning for demonstration
       // In real Move, standard ops abort on overflow, but older versions or specific patterns might need care
    }

    // 4. Placeholder TODOs
    if (line.includes('TODO') || line.includes('FIXME')) {
      issues.push({
        severity: "LOW",
        line: lineNum,
        title: "Leftover Comment",
        description: "Production code should not contain TODOs.",
        suggestion: "Resolve the comment or remove it before deployment."
      });
    }

    // 5. Uninitialized Resources Mock
    if (line.includes('borrow_global') && !code.includes('exists')) {
       issues.push({
        severity: "HIGH",
        line: lineNum,
        title: "Potential Uninitialized Resource",
        description: "Attempting to borrow a resource without checking if it exists.",
        suggestion: "Wrap this call with 'if (exists<Resource>(addr)) { ... }'."
      });
    }
  });

  // If code is empty or too short, return specific help
  if (code.trim().length < 10) return [];

  return issues;
}

export const DEMO_VULNERABLE_CODE = `module 0x42::VulnerableDeFi {
    use std::signer;
    use aptos_framework::coin;

    struct Vault has key {
        balance: u64
    }

    // CRITICAL: Anyone can call this!
    public fun withdraw_all(recipient: address) acquires Vault {
        let vault = borrow_global_mut<Vault>(0x42); // MEDIUM: Hardcoded address
        let amount = vault.balance;
        
        // No checks! Steal everything!
        vault.balance = vault.balance - amount;
        
        // TODO: Add events later
    }
    
    public fun deposit(account: &signer, amount: u64) acquires Vault {
        let vault = borrow_global_mut<Vault>(0x42); // MEDIUM: Hardcoded address
        vault.balance = vault.balance + amount;
    }
}`;
