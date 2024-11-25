import React from "react";
import { addons, types } from "storybook/internal/manager-api";

import { Panel } from "./components/Panel";

// Extend the Window interface to include myAwesomeFigmaDataSet
declare global {
  interface Window {
    myAwesomeFigmaDataSet: { id: string; name: string; status: string }[];
  }
}
import { Tab } from "./components/Tab";
import { Tool } from "./components/Tool";
import { ADDON_ID, PANEL_ID, TAB_ID, TOOL_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register a tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "My addon",
    match: ({ viewMode, tabId }) =>
      !!((viewMode && viewMode.match(/^(story)$/)) || tabId === TAB_ID),
    render: () => <Tool api={api} />,
  });

  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "My addon",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <Panel active={active} />,
  });

  // Register a tab
  addons.add(TAB_ID, {
    type: types.TAB,
    title: "My addon",
    render: ({ active }) => <Tab active={active} />,
  });

  console.log("Window", window);

  window['myAwesomeFigmaDataSet'] = [
    {
      id: "1",
      name: "Design 1",
      status: "In progress",
    },
    {
      id: "2",
      name: "Design 2",
      status: "In progress",
    },
    {
      id: "3",
      name: "Design 3",
      status: "In progress",
    },
  ]
});
