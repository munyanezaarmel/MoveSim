export interface SimulationResult {
  success: boolean;
  gasUsed: number;
  gasCostMOVE: string;
  gasCostUSD: string;
  executionTime: number;
  message?: string;
  error?: {
    type: string;
    code: number;
    message: string;
    location: string;
    line: number;
    suggestion: string;
  };
  stateChanges: StateChange[];
  events: Event[];
  gasBreakdown?: {
    computation: number;
    storage: number;
    network: number;
  };
  securityWarning?: string;
}

export interface StateChange {
  address: string;
  resource: string;
  field: string;
  before: string;
  after: string;
  change: string;
  changeFormatted?: string;
}

export interface Event {
  type: string;
  guid?: string;
  sequence?: string;
  data: any;
}

export interface ContractFunction {
  name: string;
  module: string;
  fullName: string;
  params: { name: string; type: string; example: string }[];
  description: string;
  mockKey: string;
}

export interface Contract {
  address: string;
  name: string;
  description: string;
  functions: ContractFunction[];
}
