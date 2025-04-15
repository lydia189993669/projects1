// src/config/llm.js
import { AzureOpenAI } from '@langchain/community/llms/azure_openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

// Azure OpenAI 主配置
const azureConfig = {
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT, // 如：https://your-resource.openai.azure.com
  apiVersion: "2024-02-15", // 使用最新稳定版API
  maxRetries: 3, // 自动重试次数
  timeout: 30000 // 30秒超时
};

// 多模型部署配置
export const azureLLMs = {
  // 法律专业模型（建议使用GPT-4）
  legal: new AzureOpenAI({
    ...azureConfig,
    deploymentName: process.env.AZURE_DEPLOYMENT_LEGAL || 'gpt-4-legal',
    temperature: 0.3, // 低随机性保证法律严谨性
    maxTokens: 1000
  }),
  
  // 通用对话模型（建议使用GPT-3.5 Turbo）
  general: new AzureOpenAI({
    ...azureConfig,
    deploymentName: process.env.AZURE_DEPLOYMENT_GENERAL || 'gpt-35-turbo',
    temperature: 0.7
  })
};

// 向量嵌入模型（必须与检索模型匹配）
export const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiKey: azureConfig.apiKey,
  azureOpenAIApiInstanceName: azureConfig.endpoint.split('/')[2].split('.')[0],
  azureOpenAIApiDeploymentName: process.env.AZURE_EMBEDDING_DEPLOYMENT || 'text-embedding-ada-002',
  azureOpenAIApiVersion: azureConfig.apiVersion
});

// 健康检查
export async function checkLLMHealth() {
  try {
    const testPrompts = {
      legal: "《劳动合同法》第四十条的内容是什么？",
      general: "你好，请回复'服务正常'"
    };

    await Promise.all([
      azureLLMs.legal.call(testPrompts.legal),
      azureLLMs.general.call(testPrompts.general)
    ]);
    
    return { 
      status: 'healthy',
      models: {
        legal: true,
        general: true
      }
    };
  } catch (err) {
    return {
      status: 'unhealthy',
      error: err.message,
      models: {
        legal: await testSingleModel('legal'),
        general: await testSingleModel('general')
      }
    };
  }
}

async function testSingleModel(modelName) {
  try {
    await azureLLMs[modelName].call("ping");
    return true;
  } catch {
    return false;
  }
}

// 默认导出法律专用模型
export default azureLLMs.legal;
