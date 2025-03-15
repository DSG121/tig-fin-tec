import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";
  const sortBy = searchParams.get("sortBy") || "name";

  let dbQuery = supabase.from("clients").select("*").eq("user_id", user.id);

  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,contact_name.ilike.%${query}%,email.ilike.%${query}%`,
    );
  }

  if (status && status !== "All") {
    dbQuery = dbQuery.eq("status", status);
  }

  const { data, error } = await dbQuery.order(sortBy, { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ clients: data });
}
