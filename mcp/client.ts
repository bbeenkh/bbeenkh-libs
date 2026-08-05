// import { Client as MCPSdkClient } from '@modelcontextprotocol/sdk/client/index.js';
// import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// import Anthropic from '@anthropic-ai/sdk';
// import dotenv from 'dotenv';
// import { Tool } from '@anthropic-ai/sdk/resources/messages.js';
// import {
//   CallToolResultSchema,
//   ListToolsResultSchema,
// } from '@modelcontextprotocol/sdk/types.js';
// import * as readline from 'node:readline';

// dotenv.config();

// interface MCPClientConfig {
//   name?: string;
//   version?: string;
// }
// // MCP 정의
// class MCPClient {
//   private anthropic: Anthropic | null = null;
//   private client: MCPSdkClient | null = null;
//   private transport: StdioClientTransport | null = null;

//   constructor(config: MCPClientConfig = {}) {
//     this.anthropic = new Anthropic();
//   }

//   /**
//    * MCP 서버에 연결하는 메서드
//    * @param path
//    */
//   async connectToServer(serverScriptPath: string): Promise<void> {}
//   //
//   async processQuery(query: string): Promise<string> {
//     if (!this.client || !this.anthropic) {
//       throw new Error('Client not connected');
//     }
//   }

//   async chatLoop(): Promise<void> {
//     console.log('\nMCP Client Started!');
//     console.log("Type your queries or 'quit' to exit.");

//     // Using Node's readline for console input
//   }

//   async cleanup(): Promise<void> {
//     this.transport && (await this.transport.close());
//     this.anthropic = null;
//     this.client = null;
//   }
// }

// /**
//  * mcp 실행시 살행 처리
//  */
// // Main execution
// async function main() {
//   if (process.argv.length < 3) {
//     console.log('Usage: ts-node client.ts <path_to_server_script>');
//     process.exit(1);
//   }

//   const client = new MCPClient();
//   try {
//     await client.connectToServer(process.argv[2]);
//     await client.chatLoop();
//   } catch (error) {
//     console.error('Error:', error);
//     await client.cleanup();
//     process.exit(1);
//   }
// }

// // Run main if this is the main module
// if (import.meta.url === new URL(process.argv[1], 'file:').href) {
//   main();
// }

// export default MCPClient;
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", "server.ts"],
});

const client = new Client(
  {
    name: "sample-client",
    version: "1.0.0",
  },
  {}
);

await client.connect(transport);

const result = await client.callTool({
  name: "hearts", // tool 이름
  arguments: {
    text: "AAAAAAAAAAAAAAAAAAAA", // 전달할 파라미터 (text: string)
  },
});

console.log(result.content);

await client.close();