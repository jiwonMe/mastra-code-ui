import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import type { ModeNodeData } from "../types"

const MODE_COLORS: Record<string, string> = {
	build: "var(--mode-build)",
	plan: "var(--mode-plan)",
	fast: "var(--mode-fast)",
}

function ModeNodeInner({ data }: NodeProps<Node<ModeNodeData, "mode">>) {
	const color = MODE_COLORS[data.modeId] ?? "var(--muted)"

	return (
		<div
			style={{
				background: "var(--bg-surface)",
				border: `2px solid ${color}`,
				borderRadius: 8,
				padding: "6px 16px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: 8,
				minWidth: 120,
			}}
		>
			<span
				style={{
					width: 8,
					height: 8,
					borderRadius: "50%",
					background: color,
					flexShrink: 0,
				}}
			/>
			<span
				style={{
					fontSize: 12,
					fontWeight: 600,
					color: "var(--text)",
					textTransform: "capitalize",
				}}
			>
				{data.modeId} mode
			</span>
			<Handle
				type="source"
				position={Position.Bottom}
				style={{ background: color, width: 6, height: 6, border: "none" }}
			/>
		</div>
	)
}

export const ModeNode = memo(ModeNodeInner)
