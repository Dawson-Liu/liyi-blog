import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/plan", async (req, res) => {
    try {
      const { niche, goal, language } = req.body;
      const isEnglish = language === 'en';
      
      const prompt = isEnglish 
        ? `Design a WordPress personal blog.
           Niche: ${niche}
           Goal: ${goal}
           
           Please provide:
           1. Themes (2-3 recommendations)
           2. Core Plugins
           3. Content Plan (5 post titles and summaries)
           4. SEO Tips
           
           Return JSON only:
           {
             "themes": [{ "name": "", "description": "", "link": "" }],
             "plugins": [{ "name": "", "purpose": "" }],
             "contentPlan": [{ "title": "", "summary": "" }],
             "seoTips": [""]
           }`
        : `帮我设计一个基于wordpress的个人博客网站。
           领域 (Niche): ${niche}
           目标 (Goal): ${goal}
           
           请提供以下建议：
           1. 主题选择 (推荐2-3个适合该领域的主题)
           2. 核心插件推荐 (必须安装的插件)
           3. 内容规划 (前5篇博文的具体标题和简介)
           4. SEO 建议
           
           请用 JSON 格式返回，包含以下字段：
           "themes": [{ "name": "", "description": "", "link": "" }],
           "plugins": [{ "name": "", "purpose": "" }],
           "contentPlan": [{ "title": "", "summary": "" }],
           "seoTips": [""]
        `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              themes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    link: { type: Type.STRING }
                  }
                }
              },
              plugins: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    purpose: { type: Type.STRING }
                  }
                }
              },
              contentPlan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  }
                }
              },
              seoTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      });
      
      res.json(JSON.parse(response.text || "{}"));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate plan" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
