import { getTaskById } from "../functions/get-task-by-id.js"

/**
 * MCP Server API Endpoints
 * @namespace TaskRecordsAPI
 */
type ErrorResponse = {
	type: "text";
	error: string;
}
export const TaskDetailsAPI = {
	/**
	* Get a Task Record by Task Id
	* @function
	* @param {string} taskId - The task ID to retrieve
	* @returns {Promise<Array<any> | ErrorResponse>}
	*/
	getTaskRecordsById: async (taskId: string): Promise<Array<any> | ErrorResponse> => {
		try {
			const taskRecords = await getTaskById(taskId);
			return taskRecords;
		} catch (error) {
			return {
				type: "text",
				error: (error as any).message,
			};
		}
	},
};