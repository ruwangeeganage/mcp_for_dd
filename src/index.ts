#!/usr/bin/env node
import {
    McpServer,
    ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { TaskDetailsAPI } from "./tools/get-dd-by-task-id.js";
import { generateFunctionDescription } from './functions/get-task-by-id.js';

const server = new McpServer({
    name: "Get Task Records By Task Id",
    version: "1.0.0",
});

server.tool("GetTaskRecordsByTaskId", generateFunctionDescription(),
    { taskId: z.string() }, async ({ taskId }) => {
        const results = await TaskDetailsAPI.getTaskRecordsById(taskId);
        if ('type' in results) {
            if (results.type === "text") {
                return { content: [{ type: "text", text: results.error }] };
            }
        }
        return { content: [{ type: "text", text: JSON.stringify(results) }] };
    });

const transport = new StdioServerTransport();
await server.connect(transport);