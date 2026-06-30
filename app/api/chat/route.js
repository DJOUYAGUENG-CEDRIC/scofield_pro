import { Mistral } from '@mistralai/mistralai';
import { SYSTEM_PROMPT } from '@/config/systemPrompt';

const mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 20;

export async function POST(request) {
  const { message, history = [] } = await request.json();

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return Response.json(
      { error: "Le champ 'message' est requis et ne peut pas être vide." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Le message ne doit pas dépasser ${MAX_MESSAGE_LENGTH} caractères.` },
      { status: 400 }
    );
  }

  try {
    const trimmedHistory = history.slice(-MAX_HISTORY_LENGTH);
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...trimmedHistory,
      { role: 'user', content: message.trim() },
    ];

    const response = await mistral.chat.complete({ model: 'mistral-small-latest', messages });
    const reply = response.choices[0]?.message?.content ?? '';
    return Response.json({ reply });
  } catch (err) {
    console.error('[chat] Erreur Mistral :', err.message ?? err);
    return Response.json(
      { error: 'Une erreur est survenue. Veuillez réessayer dans quelques instants.' },
      { status: 500 }
    );
  }
}
