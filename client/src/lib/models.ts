import { AIModel } from "@shared/schema";

export const AI_MODELS: AIModel[] = [
  // OpenAI / GPT Models
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-5-nano", name: "GPT-5 Nano", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-5-chat-latest", name: "GPT-5 Chat Latest", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-4.5-preview", name: "GPT-4.5 Preview", provider: "OpenAI", category: "OpenAI" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", category: "OpenAI", supportsVision: true },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", category: "OpenAI", supportsVision: true },
  { id: "o1", name: "o1", provider: "OpenAI", category: "OpenAI" },
  { id: "o1-mini", name: "o1 Mini", provider: "OpenAI", category: "OpenAI" },
  { id: "o1-pro", name: "o1 Pro", provider: "OpenAI", category: "OpenAI" },
  { id: "o3", name: "o3", provider: "OpenAI", category: "OpenAI" },
  { id: "o3-mini", name: "o3 Mini", provider: "OpenAI", category: "OpenAI" },
  { id: "o4-mini", name: "o4 Mini", provider: "OpenAI", category: "OpenAI" },

  // Anthropic Claude Models
  { id: "claude", name: "Claude", provider: "Anthropic", category: "Anthropic" },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", category: "Anthropic" },
  { id: "claude-3.7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", category: "Anthropic" },

  // Google Gemini Models
  { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", category: "Google" },

  // xAI Grok Models
  { id: "x-ai/grok-2-1212", name: "Grok 2 (12/12)", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-2-vision-1212", name: "Grok 2 Vision (12/12)", provider: "xAI", category: "xAI", supportsVision: true },
  { id: "x-ai/grok-3", name: "Grok 3", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-3-beta", name: "Grok 3 Beta", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-3-mini", name: "Grok 3 Mini", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-3-mini-beta", name: "Grok 3 Mini Beta", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-4", name: "Grok 4", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-4-fast:free", name: "Grok 4 Fast (Free)", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-code-fast-1", name: "Grok Code Fast 1", provider: "xAI", category: "xAI" },
  { id: "x-ai/grok-vision-beta", name: "Grok Vision Beta", provider: "xAI", category: "xAI", supportsVision: true },

  // Meta Llama Models
  { id: "meta-llama/llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", category: "Meta" },
  { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B Instruct", provider: "Meta", category: "Meta" },
  { id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct", provider: "Meta", category: "Meta" },
  { id: "meta-llama/llama-guard-3-8b", name: "Llama Guard 3 8B", provider: "Meta", category: "Meta" },

  // DeepSeek Models
  { id: "deepseek-chat", name: "DeepSeek Chat (V3.1)", provider: "DeepSeek", category: "DeepSeek" },
  { id: "deepseek-reasoner", name: "DeepSeek Reasoner (R1)", provider: "DeepSeek", category: "DeepSeek" },

  // Cohere Models
  { id: "cohere/command", name: "Command", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-a", name: "Command A", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r", name: "Command R", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r-03-2024", name: "Command R (03/2024)", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r-08-2024", name: "Command R (08/2024)", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r-plus", name: "Command R+", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r-plus-04-2024", name: "Command R+ (04/2024)", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r-plus-08-2024", name: "Command R+ (08/2024)", provider: "Cohere", category: "Cohere" },
  { id: "cohere/command-r7b-12-2024", name: "Command R7B (12/2024)", provider: "Cohere", category: "Cohere" },
];

export const MODEL_CATEGORIES = [
  "OpenAI",
  "Anthropic",
  "Google",
  "xAI",
  "Meta",
  "DeepSeek",
  "Cohere",
] as const;

export function getModelsByCategory(category: string): AIModel[] {
  return AI_MODELS.filter((model) => model.category === category);
}

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((model) => model.id === id);
}

export const DEFAULT_MODEL = "gpt-5-nano";
export const DEFAULT_TEMPERATURE = 0.7;
