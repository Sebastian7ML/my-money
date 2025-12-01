import { NextRequest, NextResponse } from 'next/server';
import { addTransaction } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const transactionData = await request.json();
    
    // Validate the data (basic validation)
    if (!transactionData.description || !transactionData.amount || !transactionData.accountId || !transactionData.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Convert amount from euros to cents
    const transaction = {
      description: transactionData.description,
      amount: Math.round(transactionData.amount * 100), // Convert to cents and round to avoid floating point issues
      accountId: transactionData.accountId,
      categoryId: transactionData.categoryId,
    };
    
    // Add the transaction
    const newTransaction = await addTransaction(transaction);
    
    return NextResponse.json(newTransaction, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}