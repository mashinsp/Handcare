import { describe, expect, it } from "vitest"
import { getAllMarkdownPaths, getMarkdownForPath } from "../lib/markdown-content"
import { productList } from "../lib/structured-data"

describe("markdown content registry", () => {
  it("has a markdown variant for the homepage", () => {
    const md = getMarkdownForPath("/")
    expect(md).toBeDefined()
    expect(md).toMatch(/^# Handcare/)
  })

  it("has a markdown variant for every product in productList", () => {
    for (const p of productList) {
      const md = getMarkdownForPath(`/products/${p.slug}`)
      expect(md, `missing markdown for ${p.slug}`).toBeDefined()
      expect(md).toContain(p.name)
    }
  })

  it("returns undefined for an unknown path", () => {
    expect(getMarkdownForPath("/this-does-not-exist-xyz")).toBeUndefined()
  })

  it("normalizes trailing slashes", () => {
    expect(getMarkdownForPath("/products/")).toBe(getMarkdownForPath("/products"))
  })

  it("lists every registered path, including the root", () => {
    const paths = getAllMarkdownPaths()
    expect(paths).toContain("/")
    expect(paths).toContain("/products")
    expect(paths.length).toBeGreaterThanOrEqual(productList.length + 2)
  })
})
