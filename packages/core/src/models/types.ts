export interface WorkspaceMetadata {
  id: string;
  name: string;
  version: string;
  createdAt: number;
  environment: 'development' | 'staging' | 'production';
}

export interface WorkbenchTask {
  id: string;
  title: string;
  category: 'core' | 'web' | 'extension' | 'infra';
  completed: boolean;
  timestamp: number;
}

export interface ExtensionCommandMessage {
  type: 'EXECUTE_COMMAND' | 'GET_STATUS' | 'STORE_DATA';
  payload?: Record<string, unknown>;
}

export interface CommandResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface TextMetrics {
  charCount: number;
  wordCount: number;
  readingTimeMinutes: number;
  hash: string;
}
