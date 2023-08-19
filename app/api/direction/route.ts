import { NextResponse } from "next/server";
import { autocomplete, directions } from "../lib/openrouteservice";


export async function POST(request: Request) {
    try {
        const body = await request.json()

        
        if (!body?.start) return NextResponse.json({ error: `body missing "start" param!` }, { status: 400 })
        if (!body?.start?.lat) return NextResponse.json({ error: `body missing "start.lat" param!` }, { status: 400 })
        if (!body?.start?.lng) return NextResponse.json({ error: `body missing "start.lng" param!` }, { status: 400 })
        if (!body?.end) return NextResponse.json({ error: `body missing "end" param!` }, { status: 400 })
        if (!body?.end?.lat) return NextResponse.json({ error: `body missing "end.lat" param!` }, { status: 400 })
        if (!body?.end?.lng) return NextResponse.json({ error: `body missing "end.lng" param!` }, { status: 400 })


        return NextResponse.json(await directions(body.start, body.end))
    } catch (e: any) {
        console.error("error in /directions api: ", e)

        return NextResponse.json({
            message: "internal server error",
            errorName: e.name,
            errorMessage: e.message,
        })
    }
}