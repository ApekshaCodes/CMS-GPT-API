export async function generateSEO({
    title,
    content,
    category,
  }: {
    title: string;
    content: string;
    category?: string;
  }) {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
    const prompt = `
    Generate SEO metadata in JSON for the following CMS page:
  
  Title: ${title}
  Category: ${category ?? 'N/A'}
  Content: ${content.slice(0, 2000)}
  
  Respond with:
  {
    "meta_title": "...",
    "meta_description": "...",
    "keywords": ["..."]
  }
  `;
  
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
  
  console.log('🔍 OpenAI response status:', response.status);
  
    if (response.status == 401) {
      return {
        meta_title: title,
        meta_description: `Read more about ${title}.`,
        keywords: [title.toLowerCase().replace(/\s+/g, '-'), 'cms'],
      };
    }
  
    const json = await response.json();
    const text = json.choices?.[0]?.message?.content || '{}';
    return JSON.parse(text);
  }
  