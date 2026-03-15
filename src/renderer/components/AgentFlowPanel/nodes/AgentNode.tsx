import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import type { AgentNodeData } from "../types"

function AgentNodeInner({ data }: NodeProps<Node<AgentNodeData, "agent">>) {
	const modelShort = data.modelId
		? (data.modelId.split("/").pop() ?? data.modelId)
		: "No model"

	return (
		<div
			style={{
				background: "var(--bg-surface)",
				border: `2px solid ${data.isActive ? "var(--accent)" : "var(--border)"}`,
				borderRadius: 10,
				padding: "8px 16px",
				display: "flex",
				alignItems: "center",
				gap: 10,
				minWidth: 160,
				transition: "border-color 0.2s",
			}}
		>
			<Handle
				type="target"
				position={Position.Top}
				style={{
					background: "var(--dim)",
					width: 6,
					height: 6,
					border: "none",
				}}
			/>
			<span
				style={{
					width: 10,
					height: 10,
					borderRadius: "50%",
					background: data.isActive ? "var(--success)" : "var(--dim)",
					flexShrink: 0,
					transition: "background 0.2s",
					boxShadow: data.isActive ? "0 0 6px var(--success)" : "none",
				}}
			/>
			<div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
				<span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
					Agent
				</span>
				<span
					style={{
						fontSize: 10,
						color: "var(--muted)",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						maxWidth: 140,
					}}
				>
					{modelShort}
				</span>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				style={{
					background: "var(--dim)",
					width: 6,
					height: 6,
					border: "none",
				}}
			/>
		</div>
	)
}

export const AgentNode = memo(AgentNodeInner)
