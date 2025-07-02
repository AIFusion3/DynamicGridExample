import { NextResponse } from 'next/server';
import footer from './footer.json';

export async function GET(request: Request) {


  return NextResponse.json(footer);
} 