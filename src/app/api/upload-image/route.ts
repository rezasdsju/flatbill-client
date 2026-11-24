
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const image = formData.get("image");

        if (!(image instanceof File)) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }

        if (!image.type.startsWith("image/")) {
            return NextResponse.json(
                { message: "Please upload a valid image" },
                { status: 400 }
            );
        }

        if (image.size > 32 * 1024 * 1024) {
            return NextResponse.json(
                { message: "Image size must be under 32MB" },
                { status: 400 }
            );
        }

        const apiKey = process.env.IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error("ImgBB API key is missing");
        }

        const imageData = new FormData();
        imageData.append("image", image);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            {
                method: "POST",
                body: imageData,
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            return NextResponse.json(
                { message: "Image upload failed" },
                { status: 502 }
            );
        }

        return NextResponse.json({
            imageUrl: result.data.url,
        });

    } catch (error) {
        console.error("Image upload error:", error);

        return NextResponse.json(
            { message: "Something went wrong during image upload" },
            { status: 500 }
        );
    }
}