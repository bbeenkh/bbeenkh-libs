import "dotenv/config";

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import Anthropic from '@anthropic-ai/sdk';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Model } from "@anthropic-ai/sdk/resources";
console.log('######process.env.ANTHROPIC_API_KEY', process.env.ANTHROPIC_API_KEY)

const model: Model = 'claude-sonnet-5'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const server = new Server(
  {
    name: 'heart-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'hearts',
      description: '입력 문자열의 글자 수만큼 ❤️를 반환',
      inputSchema: {
        type: 'object',
        // text 를 받음
        properties: {
          text: {
            type: 'string',
          },
        },
        required: ['text'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'hearts') {
    throw new Error('Unknown tool');
  }
  // 입력받은 텍스트
  const text = String(request.params.arguments?.text ?? '');

  const prompt = `${text}의 각 단어 끝마다 💩 붙여 반환`;
  const res = await anthropic.messages.create({
    model: model,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const output =
  res.content[0].type === "text"
    ? res.content[0].text
    : "";

  return {
    content: [
      {
        type: 'text',
        text: output,
      },
    ],
  };
});

const transport = new StdioServerTransport();

await server.connect(transport);

console.error('Heart MCP Server Started');
