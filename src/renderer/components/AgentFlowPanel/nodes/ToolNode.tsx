import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import type { ToolNodeData } from "../types"
import { TOOL_CATEGORY_COLORS, DEFAULT_TOOL_COLOR } from "../types"

function ToolNodeInner({ data }: NodeProps<Node<ToolNodeData, "tool">>) {
	const { toolState, category } = data
	const color = category
		? (TOOL_CATEGORY_COLORS[category] ?? DEFAULT_TOOL_COLOR)
		: DEFAULT_TOOL_COLOR

	const statusIcon =
		toolState.status === "running"
			? "\u23F3"
			: toolState.status === "complete"
				? "\u2713"
				: toolState.status === "error"
					? "\u2717"
					: "\u25CB"

	const statusColor =
		toolState.status === "running"
			? "var(--warning)"
			: toolState.status === "complete"
				? "var(--success)"
				: toolState.status === "error"
					? "var(--error)"
					: "var(--dim)"

	return (
		<div
			style={{
				background: "var(--bg-surface)",
				borderLeft: `3px solid ${color}`,
				borderTop: "1px solid var(--border-muted)",
				borderRight: "1px solid var(--border-muted)",
				borderBottom: "1px solid var(--border-muted)",
				borderRadius: 6,
				padding: "6px 10px",
				minWidth: 140,
				opacity: toolState.status === "complete" ? 0.75 : 1,
				transition: "opacity 0.2s",
			}}
		>
			<Handle
				type="target"
				position={Position.Top}
				style={{ background: color, width: 6, height: 6, border: "none" }}
			/>
			<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
				{category && (
					<span
						style={{
							fontSize: 9,
							fontWeight: 600,
							color,
							background: `${color}20`,
							padding: "1px 5px",
							borderRadius: 3,
							textTransform: "uppercase",
							letterSpacing: 0.5,
						}}
					>
						{category}
					</span>
				)}
				<span
					style={{
						fontSize: 11,
						fontWeight: 600,
						color: "var(--text)",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						maxWidth: 120,
					}}
				>
					{toolState.name}
				</span>
			</div>
			<div
				style={{
					fontSize: 10,
					color: statusColor,
					marginTop: 3,
					display: "flex",
					alignItems: "center",
					gap: 4,
				}}
			>
				<span>{statusIcon}</span>
				<span>
					{toolState.status === "running" && "running"}
					{toolState.status === "complete" && "done"}
					{toolState.status === "error" && "error"}
					{toolState.status === "pending" && "pending"}
				</span>
			</div>
		</div>
	)
}

export const ToolNode = memo(ToolNodeInner)
