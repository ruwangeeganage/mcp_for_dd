# debug-task-id

A Node.js/TypeScript MCP server for retrieving Task Records by Task ID from AWS DynamoDB.

## Integration with Cursor
This is the json file for the MCP server:
```json
{
  "mcpServers": {
    "server-name": {
      "command": "./debug-task-id/dist/index.js",
      "args": [],
      "cwd": "."
    }
  }
}
```

## You need to be authenticated with the AWS CLI, in order to access the DynamoDB table.
## Set the AWS CLI profile to `dd`
## Set the AWS CLI region to `eu-west-1`
## Set the AWS CLI table name to `data-compliance-service-task-status-store`

## Features

- Exposes an MCP server tool: **GetTaskRecordsByTaskId**
- Fetches task records from DynamoDB by `taskId`
- Strongly typed with Zod schema validation
- Easily extensible and ready for integration with Model Context Protocol (MCP) tools

## Project Structure

```
src/
  index.ts                # Entry point, MCP server setup
  functions/
    get-task-by-id.ts     # Core logic: fetch and validate task records
  tools/
    get-dd-by-task-id.ts  # API wrapper for task record retrieval
```

## Usage

### Prerequisites

- Node.js v16+
- AWS credentials configured (for DynamoDB access)

### Install dependencies

```sh
npm install
```

### Build

```sh
npm run build
```

### Run

```sh
npm start
```

Or using the Makefile:

```sh
make run
```

### To run the MCP server

```sh
npm start
```

### To run MCP inspector

```sh
npm run inspector
```

### MCP Tool: GetTaskRecordsByTaskId

- **Input:**  
  - `taskId` (string): A unique identifier for the task.
- **Output:**  
  - Array of Task Records based on selected fields
