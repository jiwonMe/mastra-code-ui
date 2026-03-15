import { useMemo } from "react"
import dagre from "@dagrejs/dagre"
import type { FlowNode, FlowEdge, FlowNodeType } from "../types"
import { NODE_DIMENSIONS } from "../types"

export function useAutoLayout(
	nodes: FlowNode[],
	edges: FlowEdge[],
): FlowNode[] {
	const nodeKey = nodes.map((n) => n.id).join(",")
	const edgeKey = edges.map((e) => `${e.source}-${e.target}`).join(",")

	return useMemo(() => {
		if (nodes.length === 0) return []

		const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
		g.setGraph({ rankdir: "TB", nodesep: 60, ranksep: 80, align: "UL" })

		for (const node of nodes) {
			const dims = NODE_DIMENSIONS[node.type as FlowNodeType] ?? {
				width: 160,
				height: 50,
			}
			g.setNode(node.id, { width: dims.width, height: dims.height })
		}

		for (const edge of edges) {
			g.setEdge(edge.source, edge.target)
		}

		dagre.layout(g)

		return nodes.map((node) => {
			const pos = g.node(node.id)
			const dims = NODE_DIMENSIONS[node.type as FlowNodeType] ?? {
				width: 160,
				height: 50,
			}
			return {
				...node,
				position: {
					x: pos.x - dims.width / 2,
					y: pos.y - dims.height / 2,
				},
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nodeKey, edgeKey])
}
