import { NextResponse } from 'next/server';
import { updateTransaction as actionsUpdateTransaction, deleteTransaction as actionsDeleteTransaction } from '@/lib/actions';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log('[api] PUT /api/transactions/[id] id=', id);
    console.log('[api] current global.transactionsStore ids:', global.transactionsStore?.map(t => t.id) ?? []);
    const body = await request.json();

    if (!body.description || body.amount == null || !body.accountId || !body.categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Expect amount in euros (float) from the client; convert to cents
    const amountInCents = Math.round(Number(body.amount) * 100);

    const updated = await actionsUpdateTransaction(id, {
      description: body.description,
      amount: amountInCents,
      accountId: body.accountId,
      categoryId: body.categoryId,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    console.log('[api] PUT updated id=', updated.id);
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error('PUT /api/transactions/[id] error', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log('[api] DELETE /api/transactions/[id] id=', id);
    console.log('[api] current global.transactionsStore ids:', global.transactionsStore?.map(t => t.id) ?? []);
    const ok = await actionsDeleteTransaction(id);
    if (!ok) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    console.log('[api] DELETE ok id=', id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('DELETE /api/transactions/[id] error', err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message || 'Server error' }, { status: 500 });
  }
}
