import env from "#start/env"
import { GoogleGenAI } from "@google/genai"

export default class GeminiCrontoller {
  private GOOGLE_AI_API_KEY: string
  private ai: any

  constructor() {
    this.GOOGLE_AI_API_KEY = env.get('GOOGLE_AI_API_KEY')
    this.ai = new GoogleGenAI({apiKey: this.GOOGLE_AI_API_KEY})
  }

  public async promptTest() {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Why is the sky blue?'
    })

    console.log(response)
  }
}