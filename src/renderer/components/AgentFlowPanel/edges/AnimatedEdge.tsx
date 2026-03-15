import { memo } from "react"
import {
	BaseEdge,
	getSmoothStepPath,
	type EdgeProps,
	type Edge,
} from "@xyflow/react"

type AnimatedEdgeData = { animated?: boolean }

function AnimatedEdgeInner({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	data,
}: EdgeProps<Edge<AnimatedEdgeData>>) {
	const [edgePath] = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		borderRadius: 8,
	})

	const isAnimated = data?.animated ?? false

	return (
		<>
			<BaseEdge
				id={id}
				path={edgePath}
				style={{
					stroke: isAnimated ? "var(--accent)" : "var(--dim)",
					strokeWidth: isAnimated ? 2 : 1.5,
					strokeDasharray: isAnimated ? "6 4" : "none",
					transition: "stroke 0.2s",
				}}
			/>
			{isAnimated && (
				<>
					<style>{`
						@keyframes flow-dash-${id.replace(/[^a-zA-Z0-9]/g, "")} {
							to { stroke-dashoffset: -20; }
						}
					`}</style>
					<path
						d={edgePath}
						fill="none"
						stroke="var(--accent)"
						strokeWidth={2}
						strokeDasharray="6 4"
						style={{
							animation: `flow-dash-${id.replace(/[^a-zA-Z0-9]/g, "")} 0.6s linear infinite`,
						}}
					/>
				</>
			)}
		</>
	)
}

export const AnimatedEdge = memo(AnimatedEdgeInner)
