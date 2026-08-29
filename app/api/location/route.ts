import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://reallyfreegeoip.org/json/", {
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Location service unavailable", details: res.status },
        { status: 502 },
      );
    }
    const data = await res.json();

    const city = (data.city || "").trim().replace(/\s+district\s*$/i, "").trim();
    const country = (data.country_name || "").trim();
    const latitude = data.latitude;
    const longitude = data.longitude;

    let district = city;

    if (!district && latitude && longitude) {
      try {
        const rev = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`,
          { signal: AbortSignal.timeout(8000) },
        );
        if (rev.ok) {
          const revData = await rev.json();
          const a = revData.address ?? {};
          district =
            a.district ||
            a.county ||
            a.suburb ||
            a.city ||
            a.town ||
            a.municipality ||
            "";
        }
      } catch {
        // ignore reverse geocoding failure
      }
    }

    return NextResponse.json({
      country,
      city,
      district: district || "",
      latitude,
      longitude,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch location. Please enter your district manually." },
      { status: 500 },
    );
  }
}
