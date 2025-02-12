"use client"

import { useWindowSize } from "@/hooks/useWindowSize"
import Streamgraph from "@/components/stream-graph/streamgraph"

export function StreamWrapper() {
  const { width, height } = useWindowSize()
  
  if (!width) return null

  return <Streamgraph width={width} height={height} />
} 