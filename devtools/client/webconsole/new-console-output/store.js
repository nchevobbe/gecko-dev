/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { createStore } = require("devtools/client/shared/vendor/redux");
const Immutable = require("devtools/client/shared/vendor/immutable");
const { reducers } = require("./reducers/index");
const Services = require("Services");

const initialState = {
  messages: Immutable.List(),
  prefs: {
    logLimit: Math.max(Services.prefs.getIntPref("devtools.hud.loglimit"), 1)
  }
};

function storeFactory() {
  return createStore((state, action) => reducers.messages(state, action), initialState);
}

// Provide the single store instance for app code.
module.exports.store = storeFactory();
// Provide the store factory for test code so that each test is working with
// its own instance.
module.exports.storeFactory = storeFactory;

