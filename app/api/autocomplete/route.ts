import { NextResponse } from "next/server";
import { autocomplete } from "../lib/openrouteservice";


export async function POST(request: Request) {
    try {
        const body = await request.json()

        
        if (!body?.text)
            return NextResponse.json({ error: `body missing "text" param!` }, { status: 400 })


        return NextResponse.json(await autocomplete(body.text))
    } catch (e: any) {
        console.error("error in /autocomplete api: ", e)

        return NextResponse.json({
            message: "internal server error",
            errorName: e.name,
            errorMessage: e.message,
        })
    }
}