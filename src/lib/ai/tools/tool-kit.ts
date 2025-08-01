import { tavilySearchTool, tavilyWebContentTool } from "./web/web-search";
import { AppDefaultToolkit, DefaultToolName } from ".";
import { Tool } from "ai";
import { httpFetchTool } from "./http/fetch";


export const APP_DEFAULT_TOOL_KIT: Record<
  AppDefaultToolkit,
  Record<string, Tool>
> = {
  [AppDefaultToolkit.WebSearch]: {
    [DefaultToolName.WebSearch]: tavilySearchTool,
    [DefaultToolName.WebContent]: tavilyWebContentTool,
  },
  [AppDefaultToolkit.Http]: {
    [DefaultToolName.Http]: httpFetchTool,
  },
  [AppDefaultToolkit.Code]: {},
};
