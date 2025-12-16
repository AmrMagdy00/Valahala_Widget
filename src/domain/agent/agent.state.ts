/**
 * Agent state management
 */
export type AgentState = {
  assigned: boolean | null;
};

export function createInitialAgentState(): AgentState {
  return {
    assigned: null,
  };
}
