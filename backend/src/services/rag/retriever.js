// retriever.js
import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { chroma } from "../../config/chroma.js";

export class RAGService {
  constructor() {
    this.vectorStore = new Chroma(
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_KEY }),
      { collectionName: "legal_docs", chromaClient: chroma }
    );
  }

  async retrieve(query) {
    return this.vectorStore.similaritySearch(query, 3);
  }
}
