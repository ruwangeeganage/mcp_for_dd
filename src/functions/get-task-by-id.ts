import AWS from "aws-sdk";
import { z } from "zod";

const defaultRegion = "eu-west-1";
const defaultProfile = "dd";
const defaultTableName = "data-compliance-service-task-status-store";

export const TaskRecordSchema = z.object({
    policy_ref: z.string(),
    action: z.string(),
    created_at: z.string(),
    status: z.string(),
    primary_identifier_name: z.string(),
    query_id: z.string(),
    total_records: z.number(),
    rollback: z.boolean(),
    rollback_created_at: z.string(),
    rollback_status: z.string(),
    query_version: z.string(),
    updated_at: z.string(),
    primary_identifier_market: z.string(),
    task_id: z.string(),
    worker_name: z.string(),
    dry_run: z.boolean(),
    uuid: z.string(),
    rollback_updated_at: z.string(),
    dry_run_worker: z.boolean(),
    primary_identifier_id: z.string(),
    record_type: z.string(),
});

type TaskRecord = z.infer<typeof TaskRecordSchema>;

export function generateFunctionDescription(): string {
    return `This function returns an **Array** of Task Records by given taskId.
The taskId is a string that uniquely identifies a task.
- taskId (string): A unique identifier for the task.
Each Task Record is an object with the following fields:
${(Object.keys(TaskRecordSchema.shape) as Array<keyof typeof TaskRecordSchema.shape>).
      map((field) => `- "${field}" as (string)`)
      .join("\n")}
    `;
}

export const getTaskById = async (taskId: string, awsProfile?: string, awsRegion?: string, awsTableName?: string): Promise<Array<TaskRecord>> => {
    AWS.config.update({
        region: awsRegion ?? defaultRegion,
    });
    const credentials = new AWS.SharedIniFileCredentials({ profile: awsProfile ?? defaultProfile });
    AWS.config.credentials = credentials;
    const dynamoDB = new AWS.DynamoDB();
    const tableName = awsTableName ?? defaultTableName;

    const records: Array<TaskRecord> = [];
    let lastEvaluatedKey: AWS.DynamoDB.Key | undefined;

    do {
        const params: AWS.DynamoDB.QueryInput = {
            TableName: tableName,
            KeyConditionExpression: "#pk = :pk",
            ExpressionAttributeNames: {
                "#pk": "task_id"
            },
            ExpressionAttributeValues: {
                ":pk": { S: taskId }
            },
            ExclusiveStartKey: lastEvaluatedKey ?? undefined
        };

        try {
            const data = await dynamoDB.query(params).promise();
            const items = data.Items?.map<TaskRecord>(item => <TaskRecord>(AWS.DynamoDB.Converter.unmarshall(item)));
            if (items) {
                records.push(...items);
            }

            lastEvaluatedKey = data.LastEvaluatedKey;
        } catch (err) {
            throw err;
        }
    } while (lastEvaluatedKey);
    return records;
}