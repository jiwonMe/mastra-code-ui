import { useMemo } from "react"
import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { ModeNode } from "./nodes/ModeNode"
import { AgentNode } from "./nodes/AgentNode"
import { ToolNode } from "./nodes/ToolNode"
import { SubagentNode } from "./nodes/SubagentNode"
import { AnimatedEdge } from "./edges/AnimatedEdge"
import { useFlowGraph } from "./hooks/useFlowGraph"
import type { AgentFlowPanelProps } from "./types"

const nodeTypes = {
	mode: ModeNode,
	agent: AgentNode,
	tool: ToolNode,
	subagent: SubagentNode,
} as const

const edgeTypes = {
	animated: AnimatedEdge,
} as const

function AgentFlowPanelInner({
	tools,
	subagents,
	isAgentActive,
	modeId,
	modelId,
	onClose,
}: AgentFlowPanelProps) {
	const { nodes, edges } = useFlowGraph({
		tools,
		subagents,
		modeId,
		modelId,
		isAgentActive,
	})

	const memoNodeTypes = useMemo(() => nodeTypes, [])
	const memoEdgeTypes = useMemo(() => edgeTypes, [])

	const hasContent = tools.size > 0 || subagents.size > 0

	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					height: 38,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					padding: "0 12px",
					borderBottom: "1px solid var(--border-muted)",
					background: "var(--bg-surface)",
					flexShrink: 0,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="var(--accent)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="6" cy="6" r="3" />
						<circle cx="18" cy="6" r="3" />
						<circle cx="12" cy="18" r="3" />
						<line x1="6" y1="9" x2="12" y2="15" />
						<line x1="18" y1="9" x2="12" y2="15" />
					</svg>
					<span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
						Agent Flow
					</span>
					{isAgentActive && (
						<span
							style={{
								fontSize: 9,
								fontWeight: 600,
								color: "var(--success)",
								background: "rgba(34, 197, 94, 0.12)",
								padding: "1px 6px",
								borderRadius: 3,
								textTransform: "uppercase",
								letterSpacing: 0.5,
							}}
						>
							Live
						</span>
					)}
				</div>
				<button
					onClick={onClose}
					style={{
						color: "var(--muted)",
						cursor: "pointer",
						fontSize: 16,
						padding: "2px 6px",
						borderRadius: 4,
						transition: "color 0.1s",
					}}
					title="Close"
				>
					&times;
				</button>
			</div>

			<div style={{ flex: 1, position: "relative" }}>
				{!hasContent && !isAgentActive ? (
					<div
						style={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: 12,
							color: "var(--muted)",
						}}
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="var(--dim)"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<circle cx="6" cy="6" r="3" />
							<circle cx="18" cy="6" r="3" />
							<circle cx="12" cy="18" r="3" />
							<line x1="6" y1="9" x2="12" y2="15" />
							<line x1="18" y1="9" x2="12" y2="15" />
						</svg>
						<span style={{ fontSize: 12 }}>
							Start a conversation to see the agent flow
						</span>
					</div>
				) : (
					<ReactFlow
						nodes={nodes}
						edges={edges}
						nodeTypes={memoNodeTypes}
						edgeTypes={memoEdgeTypes}
						fitView
						fitViewOptions={{ padding: 0.3 }}
						nodesDraggable={false}
						nodesConnectable={false}
						elementsSelectable={false}
						panOnDrag
						zoomOnScroll
						minZoom={0.3}
						maxZoom={2}
						proOptions={{ hideAttribution: true }}
						style={{ background: "var(--bg)" }}
					>
						<Background
							variant={BackgroundVariant.Dots}
							gap={20}
							size={1}
							color="var(--border-muted)"
						/>
					</ReactFlow>
				)}
			</div>
		</div>
	)
}

export function AgentFlowPanel(props: AgentFlowPanelProps) {
	return (
		<ReactFlowProvider>
			<AgentFlowPanelInner {...props} />
		</ReactFlowProvider>
	)
}
