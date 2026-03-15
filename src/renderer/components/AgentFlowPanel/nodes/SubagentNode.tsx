import { memo } from "react"
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react"
import type { SubagentNodeData } from "../types"

function SubagentNodeInner({
	data,
}: NodeProps<Node<SubagentNodeData, "subagent">>) {
	const { subagentState } = data
	const isRunning = subagentState.status === "running"
	const taskPreview =
		subagentState.task.length > 60
			? subagentState.task.slice(0, 60) + "\u2026"
			: subagentState.task

	return (
		<div
			style={{
				background: "var(--bg-surface)",
				border: `2px solid ${isRunning ? "var(--accent)" : "var(--border)"}`,
				borderRadius: 8,
				padding: "8px 10px",
				minWidth: 180,
				maxWidth: 220,
				opacity: subagentState.status === "complete" ? 0.75 : 1,
				transition: "border-color 0.2s, opacity 0.2s",
			}}
		>
			<Handle
				type="target"
				position={Position.Top}
				style={{
					background: "var(--accent)",
					width: 6,
					height: 6,
					border: "none",
				}}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 6,
					marginBottom: 4,
				}}
			>
				<span
					style={{
						fontSize: 9,
						fontWeight: 600,
						color: "var(--accent)",
						background: "var(--overlay-bg)",
						padding: "1px 5px",
						borderRadius: 3,
						textTransform: "uppercase",
						letterSpacing: 0.5,
					}}
				>
					{subagentState.agentType}
				</span>
				{subagentState.status === "complete" &&
					subagentState.durationMs != null && (
						<span style={{ fontSize: 9, color: "var(--dim)" }}>
							{(subagentState.durationMs / 1000).toFixed(1)}s
						</span>
					)}
			</div>
			<div
				style={{
					fontSize: 10,
					color: "var(--muted)",
					lineHeight: 1.3,
					marginBottom: 4,
					wordBreak: "break-word",
				}}
			>
				{taskPreview}
			</div>
			{subagentState.tools.length > 0 && (
				<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
					{subagentState.tools.slice(-3).map((t, i) => (
						<div
							key={`${t.name}-${i}`}
							style={{
								fontSize: 9,
								color: t.status === "running" ? "var(--warning)" : "var(--dim)",
								display: "flex",
								alignItems: "center",
								gap: 4,
							}}
						>
							<span>{t.status === "running" ? "\u23F3" : "\u2713"}</span>
							<span
								style={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
									maxWidth: 160,
								}}
							>
								{t.name}
							</span>
						</div>
					))}
					{subagentState.tools.length > 3 && (
						<span style={{ fontSize: 9, color: "var(--dim)" }}>
							+{subagentState.tools.length - 3} more
						</span>
					)}
				</div>
			)}
		</div>
	)
}

export const SubagentNode = memo(SubagentNodeInner)
