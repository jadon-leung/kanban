import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // Fetch tasks from database
  return NextResponse.json({ tasks: [] })
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  // Create new task
  return NextResponse.json({ success: true })
} 