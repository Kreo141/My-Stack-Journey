import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App scaffold", () => {
  it("renders the learning tracker title and intro", () => {
    const markup = renderToStaticMarkup(createElement(App));

    expect(markup).toContain("<h1");
    expect(markup).toContain("My Stack Journey");
    expect(markup).toContain("track your progress");
  });
});
