import { describe, expect, it } from "vitest"
import { prefersMarkdown } from "../proxy"

describe("prefersMarkdown", () => {
  it("prefers markdown when it has a higher q-value", () => {
    expect(prefersMarkdown("text/markdown;q=1.0, text/html;q=0.8")).toBe(true)
  })

  it("does not prefer markdown when html has a higher q-value", () => {
    expect(prefersMarkdown("text/markdown;q=0.5, text/html;q=1.0")).toBe(false)
  })

  it("treats bare text/markdown as preferred over an unqualified */*", () => {
    expect(prefersMarkdown("text/markdown, */*;q=0.1")).toBe(true)
  })

  it("returns false when markdown isn't mentioned at all", () => {
    expect(prefersMarkdown("text/html,application/xhtml+xml")).toBe(false)
  })

  it("returns false for an empty/absent header", () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown("")).toBe(false)
  })

  it("treats equal q-values as a markdown preference (tie goes to markdown)", () => {
    expect(prefersMarkdown("text/markdown;q=0.9, text/html;q=0.9")).toBe(true)
  })
})
