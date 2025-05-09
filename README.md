# debug-task-id

A Node.js/TypeScript MCP server for retrieving Task Records by Task ID from AWS DynamoDB, using Zod for schema validation.

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
  - An array of Task Records, each with fields:
    - `policy_ref`, `action`, `created_at`, `status`, `primary_identifier_name`, `query_id`, `total_records`, `rollback`, `rollback_created_at`, `rollback_status`, `query_version`, `updated_at`, `primary_identifier_market`, `task_id`, `worker_name`, `dry_run`, `uuid`, `rollback_updated_at`, `dry_run_worker`, `primary_identifier_id`, `record_type`
