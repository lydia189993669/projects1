// generator.js

import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import azureLLM from "../../config/llm.js";

export async function generateLegalAnswer(context, question) {
  const prompt = new PromptTemplate({
    template: `你是一名专业律师，请根据以下法律条文回答问题：
    
    相关条文：
    {context}
    
    问题：{question}
    
    回答时请：
    1. 引用具体法律条款
    2. 分步骤解释
    3. 使用中文回答`,
    inputVariables: ["context", "question"],
  });

  const chain = new LLMChain({
    llm: azureLLM,
    prompt,
  });

  const response = await chain.call({ context, question });
  return response.text;
}