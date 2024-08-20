import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({ message: 'Logout successful' }, {
    'headers': {
        'Set-cookie': "authToken=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict"
    }
  });
};
