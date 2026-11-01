import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content";

export const alt = `${site.name}: ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [font, photo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/cormorant-garamond-latin-600-normal.woff")),
    readFile(join(process.cwd(), "public/images/hero-hands.jpg")),
  ]);
  const img = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #fbf6f1 0%, #f6e7e3 60%, #e8ede3 100%)",
          padding: "0 70px",
          color: "#3d2c2e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#826231" }}>OLD TOWN SCOTTSDALE · ARIZONA</div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontFamily: "Cormorant", fontSize: 96, lineHeight: 1 }}>
            <span>Beautiful nails,</span>
            <span style={{ display: "flex" }}>
              beautifully&nbsp;<span style={{ color: "#a2545f" }}>calm.</span>
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 34, fontFamily: "Cormorant", fontSize: 42 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 6, fontSize: 24, color: "#7b6668" }}>
            Gel · Gel-X · Builder gel · Spa pedicures · Book online
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 360,
            height: 470,
            borderRadius: "180px 180px 24px 24px",
            overflow: "hidden",
            border: "2px solid #c4a46a",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" width={360} height={450} style={{ objectFit: "cover", width: 360, height: 470 }} />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant", data: font, weight: 600, style: "normal" }] },
  );
}
