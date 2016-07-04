/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const Immutable = require("devtools/client/shared/vendor/immutable");
const constants = require("devtools/client/webconsole/new-console-output/constants");
const { getAllMessages } = require("devtools/client/webconsole/new-console-output/selectors/messages");
const { getLogLimit } = require("devtools/client/webconsole/new-console-output/selectors/log-limit");

function messages(state, action) {
  switch (action.type) {
    case constants.MESSAGE_ADD:
      return Object.assign({}, state, {
        messages: prune(state, addMessage(action.message, getAllMessages(state)))});

    case constants.MESSAGES_CLEAR:
      return Object.assign({}, state, {
        messages: Immutable.List()});
  }

  return state;
}

function addMessage(newMessage, messagesList = Immutable.List()) {
  if (newMessage.data.level === "clear") {
    return Immutable.List([newMessage]);
  }

  if (newMessage.allowRepeating && messagesList.count() > 0) {
    let lastMessage = messagesList.last();
    if (lastMessage.repeatId === newMessage.repeatId) {
      newMessage.repeat = lastMessage.repeat + 1;
      return messagesList.pop().push(newMessage);
    }
  }

  return messagesList.push(newMessage);
}

function prune(state, messagesList = Immutable.List()) {
  let messageCount = messagesList.count();
  let logLimit = getLogLimit(state);

  if (messageCount > logLimit) {
    return messagesList.splice(0, messageCount - logLimit);
  }

  return messagesList;
}

exports.messages = messages;
