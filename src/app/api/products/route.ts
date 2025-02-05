import { NextResponse } from 'next/server';
import products from './products.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const sortField = searchParams.get('sortField') || 'id';
  const sortDirection = searchParams.get('sortDirection') || 'asc';

  // Sıralama işlemi
  const sortedProducts = [...products].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField as keyof typeof a] > b[sortField as keyof typeof b] ? 1 : -1;
    }
    return a[sortField as keyof typeof a] < b[sortField as keyof typeof b] ? 1 : -1;
  });

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  const paginatedProducts = sortedProducts.slice(start, end);
  
  return NextResponse.json({
    data: paginatedProducts,
    total: products.length,
    page,
    pageSize,
    sortField,
    sortDirection
  });
} 