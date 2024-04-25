import { json } from '@remix-run/node';
import { pipeline, TextClassificationPipeline } from '@xenova/transformers';  // added TextClassificationPipeline import 

const model = 'xenova/distilbert-base-uncased-finetuned-sst-2-english';
let classifier: TextClassificationPipeline | null = null;  // more typing :D

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const text = url.searchParams.get('text');

  if (!text) {
    return json({ error: 'Text parameter is required' }, { status: 400 });
  }

  if (!classifier) {
    classifier = await pipeline('text-classification', model) as TextClassificationPipeline;  
  }

  if (classifier) {
    const result = await classifier(text);
    return json(result);
  } else {
    return json({ error: 'Classifier is not initialized' }, { status: 500 });
  }
};
