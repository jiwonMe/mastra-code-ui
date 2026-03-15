import type { Node, Edge } from "@xyflow/react"
import type { ToolState, SubagentState } from "../../types/chat"
import type { ToolCategory } from "../../../permissions"

export interface ModeNodeData {
	modeId: string
	[key: string]: unknown
}

export interface AgentNodeData {
	modelId: string
	isActive: boolean
	[key: string]: unknown
}

export interface ToolNodeData {
	toolState: ToolState
	category: ToolCategory | null
	[key: string]: unknown
}

export interface SubagentNodeData {
	subagentState: SubagentState
	[key: string]: unknown
}

export type FlowNodeType = "mode" | "agent" | "tool" | "subagent"

export type ModeFlowNode = Node<ModeNodeData, "mode">
export type AgentFlowNode = Node<AgentNodeData, "agent">
export type ToolFlowNode = Node<ToolNodeData, "tool">
export type SubagentFlowNode = Node<SubagentNodeData, "subagent">

export type FlowNode =
	| ModeFlowNode
	| AgentFlowNode
	| ToolFlowNode
	| SubagentFlowNode

export type FlowEdge = Edge<{ animated?: boolean }>

export const TOOL_CATEGORY_COLORS: Record<string, string> = {
	read: "#0d9488",
	edit: "#d97706",
	execute: "#7c3aed",
	mcp: "#2563eb",
}

export const DEFAULT_TOOL_COLOR = "#6b7280"

export const NODE_DIMENSIONS: Record<
	FlowNodeType,
	{ width: number; height: number }
> = {
	mode: { width: 160, height: 46 },
	agent: { width: 200, height: 56 },
	tool: { width: 180, height: 52 },
	subagent: { width: 220, height: 80 },
}

export interface AgentFlowPanelProps {
	tools: Map<string, ToolState>
	subagents: Map<string, SubagentState>
	isAgentActive: boolean
	modeId: string
	modelId: string
	onClose: () => void
}
