import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy") || "created_at";

  // Build query
  let query = supabase.from("tasks").select("*").eq("user_id", user.id);

  // Apply filters if provided
  if (status) query = query.eq("status", status);
  if (priority) query = query.eq("priority", priority);
  if (category) query = query.eq("category", category);

  // Execute query
  const { data, error } = await query.order(sortBy, { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tasks: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Add user_id and created_by to the task
    const taskData = {
      ...body,
      user_id: user.id,
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert(taskData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
