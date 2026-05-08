<script lang="ts">
    import { onMount } from 'svelte';
    import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
    import { drag } from 'd3-drag';
    import { select } from 'd3-selection';

    interface Node {
        id: string;
        x?: number;
        y?: number;
        fx?: number | null;
        fy?: number | null;
        status?: 'unprocessed' | 'inprocess' | 'processed';
    }

    interface Edge {
        source: any;
        target: any;
        weight?: number;
        highlighted?: boolean;
    }

    interface Props {
        nodes: Node[];
        edges: Edge[];
        directed?: boolean;
        width?: number;
        height?: number;
        highlightedNodes?: Set<string>;
        activeNode?: string | null;
        instanceId?: string;
    }

    let { 
        nodes = [], 
        edges = [], 
        directed = false, 
        width = 600, 
        height = 400,
        highlightedNodes = new Set(),
        activeNode = null,
        instanceId = Math.random().toString(36).substring(7),
        nodeLabels = {},
        highlightedEdges = new Set()
    }: Props = $props();

    let simulationNodes = $state(nodes.map(n => ({ ...n })));
    let simulationLinks = $state(edges.map(e => ({ ...e })));
    let svgElement: SVGSVGElement;
    const RADIUS = 22;

    onMount(() => {
        const simulation = forceSimulation(simulationNodes)
            .force("link", forceLink(simulationLinks).id((d: any) => d.id).distance(120))
            .force("charge", forceManyBody().strength(-400))
            .force("center", forceCenter(width / 2, height / 2))
            .force("collide", forceCollide(RADIUS + 25))
            .on("tick", () => {
                simulationNodes = [...simulationNodes];
                simulationLinks = [...simulationLinks];
            });

        const dragBehavior = drag<SVGGElement, any>()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        select(svgElement)
            .selectAll<SVGGElement, any>(".node-group")
            .data(simulationNodes)
            .call(dragBehavior);

        return () => simulation.stop();
    });

    function getLinkColor(link: any) {
        if (link.highlighted) return "var(--primary-color, #007aff)";
        return "var(--border-color, #999)";
    }

    function getNodeColor(node: any) {
        if (node.id === activeNode) return "var(--warning-color, #ff9500)";
        if (highlightedNodes.has(node.id)) return "var(--primary-color, #007aff)";
        if (node.status === 'processed') return "#4cd964";
        if (node.status === 'inprocess') return "#ffcc00";
        return "#fff";
    }

    // Helper to calculate the point on the circle boundary
    function getPointOnCircle(source: any, target: any, radius: number) {
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const angle = Math.atan2(dy, dx);
        return {
            x: source.x + radius * Math.cos(angle),
            y: source.y + radius * Math.sin(angle)
        };
    }
</script>

<div class="graph-container" style="width: {width}px; height: {height}px;">
    <svg bind:this={svgElement} {width} {height} viewBox="0 0 {width} {height}">
        <defs>
            <!-- Marker pointing to the right, tip at (10, 5) -->
            <marker 
                id="arrowhead-{instanceId}" 
                viewBox="0 0 10 10" 
                refX="9" 
                refY="5" 
                markerWidth="6" 
                markerHeight="6" 
                orient="auto-start-reverse"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-color, #333)" />
            </marker>
            <marker 
                id="arrowhead-highlight-{instanceId}" 
                viewBox="0 0 10 10" 
                refX="9" 
                refY="5" 
                markerWidth="6" 
                markerHeight="6" 
                orient="auto-start-reverse"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary-color, #007aff)" />
            </marker>
        </defs>

        <g class="links">
            {#each simulationLinks as link}
                {#if link.source.x && link.target.x}
                    {@const start = getPointOnCircle(link.source, link.target, RADIUS)}
                    {@const end = getPointOnCircle(link.target, link.source, RADIUS)}
                    {@const isHighlighted = link.highlighted || highlightedEdges.has(`${link.source.id}-${link.target.id}`) || highlightedEdges.has(`${link.target.id}-${link.source.id}`)}
                    <line 
                        x1={start.x} y1={start.y} 
                        x2={end.x} y2={end.y}
                        stroke={isHighlighted ? "var(--primary-color, #007aff)" : getLinkColor(link)}
                        stroke-width={isHighlighted ? 4 : 2}
                        marker-end={directed ? (isHighlighted ? `url(#arrowhead-highlight-${instanceId})` : `url(#arrowhead-${instanceId})`) : ""}
                        style="transition: stroke 0.3s, stroke-width 0.3s"
                    />
                    {#if link.weight !== undefined}
                        <text 
                            x={(start.x + end.x) / 2} 
                            y={(start.y + end.y) / 2 - 10}
                            text-anchor="middle"
                            font-size="14"
                            font-weight="bold"
                            fill="var(--primary-color, #007aff)"
                            class="weight-text"
                        >
                            {link.weight}
                        </text>
                    {/if}
                {/if}
            {/each}
        </g>

        <g class="nodes">
            {#each simulationNodes as node}
                <g class="node-group" style="cursor: grab">
                    <circle 
                        cx={node.x} cy={node.y} r={RADIUS} 
                        fill={getNodeColor(node)} 
                        stroke={highlightedNodes.has(node.id) || node.id === activeNode ? "var(--primary-color, #007aff)" : "var(--border-color, #999)"} 
                        stroke-width={highlightedNodes.has(node.id) || node.id === activeNode ? 4 : 2}
                        style="transition: fill 0.3s, stroke 0.3s, stroke-width 0.3s"
                    />
                    <text 
                        x={node.x} y={node.y} 
                        text-anchor="middle" 
                        dominant-baseline="central"
                        font-weight="bold"
                        fill={highlightedNodes.has(node.id) || node.id === activeNode ? "#fff" : "var(--text-color, #333)"}
                        style="transition: fill 0.3s"
                    >
                        {node.id}
                    </text>
                    {#if nodeLabels[node.id] !== undefined}
                        <text 
                            x={node.x} y={node.y - RADIUS - 5} 
                            text-anchor="middle" 
                            font-size="12"
                            font-weight="bold"
                            fill="var(--primary-color, #007aff)"
                            class="node-label-text"
                        >
                            {nodeLabels[node.id]}
                        </text>
                    {/if}
                </g>
            {/each}
        </g>
    </svg>
</div>

<style>
    .graph-container {
        background: var(--bg-secondary, #f9f9f9);
        border-radius: 16px;
        border: 1px solid var(--border-color, #ddd);
        margin: 1.5rem 0;
        overflow: hidden;
        box-shadow: inset 0 4px 8px rgba(0,0,0,0.05);
        position: relative;
    }

    svg {
        display: block;
        max-width: 100%;
        height: auto;
    }

    .weight-text, .node-label-text {
        paint-order: stroke;
        stroke: #fff;
        stroke-width: 3px;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .node-group:active {
        cursor: grabbing;
    }
</style>
