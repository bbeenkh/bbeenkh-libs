import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "heart-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "hearts",
      description: "입력 문자열의 글자 수만큼 ❤️를 반환",
      inputSchema: {
        type: "object",
        // text 를 받음
        properties: {
          text: {
            type: "string",
          },
        },
        required: ["text"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "hearts") {
    throw new Error("Unknown tool");
  }

  const text = String(request.params.arguments?.text ?? "");

  const result = "❤️".repeat(text.length);

  return {
    content: [
      {
        type: "text",
        text: result,
      },
    ],
  };
});

const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Heart MCP Server Started");