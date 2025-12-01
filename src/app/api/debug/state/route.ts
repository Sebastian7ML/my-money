import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Expose the in-memory stores for debug only (development use)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const transactions = global.transactionsStore ?? null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const accounts = global.accountsStore ?? null;

    return NextResponse.json({ transactions, accounts }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[api/debug/state] error', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
