/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */
"use strict";

// Test utils.
const expect = require("expect");
const { render } = require("enzyme");

// Components under test.
const { PageError } = require("devtools/client/webconsole/new-console-output/components/message-types/page-error");

// Test fakes.
const { stubPreparedMessages } = require("devtools/client/webconsole/new-console-output/test/fixtures/stubs/index");

describe("PageError component:", () => {
  it("renders", () => {
    const message = stubPreparedMessages.get("ReferenceError: asdf is not defined");
    const wrapper = render(PageError({ message }));

    expect(wrapper.find(".message-body").text())
      .toBe("ReferenceError: asdf is not defined");

    // The stacktrace should be closed by default.
    const frameLinks = wrapper.find(`.stack-trace`);
    expect(frameLinks.length).toBe(0);
  });

  it("has a stacktrace which can be openned", () => {
    const message = stubPreparedMessages.get("ReferenceError: asdf is not defined");
    const wrapper = render(PageError({ message, open: true }));

    // There should be three stacktrace items.
    const frameLinks = wrapper.find(`.stack-trace span.frame-link`);
    expect(frameLinks.length).toBe(3);
  });
});
