import { useMemo } from "react"
import type { ToolState, SubagentState } from "../../../types/chat"
import { getToolCategory } from "../../../../permissions"
import type {
	FlowNode,
	FlowEdge,
	ModeNodeData,
	AgentNodeData,
	ToolNodeData,
	SubagentNodeData,
} from "../types"
import { useAutoLayout } from "./useAutoLayout"

interface UseFlowGraphInput {
	tools: Map<string, ToolState>
	subagents: Map<string, SubagentState>
	modeId: string
	modelId: string
	isAgentActive: boolean
}

export function useFlowGraph({
	tools,
	subagents,
	modeId,
	modelId,
	isAgentActive,
}: UseFlowGraphInput) {
	const toolIds = useMemo(() => [...tools.keys()].sort().join(","), [tools])
	const subagentIds = useMemo(
		() => [...subagents.keys()].sort().join(","),
		[subagents],
	)

	const { structuralNodes, structuralEdges } = useMemo(() => {
		const nodes: FlowNode[] = []
		const edges: FlowEdge[] = []

		nodes.push({
			id: "mode",
			type: "mode",
			position: { x: 0, y: 0 },
			data: { modeId } as ModeNodeData,
		})

		nodes.push({
			id: "agent",
			type: "agent",
			position: { x: 0, y: 0 },
			data: { modelId, isActive: isAgentActive } as AgentNodeData,
		})

		edges.push({
			id: "mode-agent",
			source: "mode",
			target: "agent",
			type: "animated",
			data: { animated: isAgentActive },
		})

		for (const [id, toolState] of tools) {
			const category = getToolCategory(toolState.name)
			nodes.push({
				id: `tool-${id}`,
				type: "tool",
				position: { x: 0, y: 0 },
				data: { toolState, category } as ToolNodeData,
			})
			edges.push({
				id: `agent-tool-${id}`,
				source: "agent",
				target: `tool-${id}`,
				type: "animated",
				data: { animated: toolState.status === "running" },
			})
		}

		for (const [id, subagentState] of subagents) {
			nodes.push({
				id: `subagent-${id}`,
				type: "subagent",
				position: { x: 0, y: 0 },
				data: { subagentState } as SubagentNodeData,
			})
			edges.push({
				id: `agent-subagent-${id}`,
				source: "agent",
				target: `subagent-${id}`,
				type: "animated",
				data: { animated: subagentState.status === "running" },
			})
		}

		return { structuralNodes: nodes, structuralEdges: edges }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toolIds, subagentIds, modeId, modelId, isAgentActive])

	const layoutedNodes = useAutoLayout(structuralNodes, structuralEdges)

	return { nodes: layoutedNodes, edges: structuralEdges }
}
