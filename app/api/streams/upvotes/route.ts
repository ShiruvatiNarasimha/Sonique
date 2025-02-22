import { prismaClient } from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Logger } from "@/app/lib/logger"; 

const UpvoteSchema = z.object({
    streamId: z.string().uuid(), 
});

const ERROR_MESSAGES = {
    UNAUTHORIZED: "Unauthorized",
    INVALID_INPUT: "Invalid input data",
    UPVOTE_ERROR: "Error while upvoting",
};

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        Logger.error("Unauthorized access attempt");
        return NextResponse.json({
            message: ERROR_MESSAGES.UNAUTHORIZED,
        }, {
            status: 403,
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: session.user.email,
        },
    });

    if (!user) {
        Logger.error("User not found for email: " + session.user.email);
        return NextResponse.json({
            message: ERROR_MESSAGES.UNAUTHORIZED,
        }, {
            status: 403,
        });
    }

    try {
        const data = UpvoteSchema.parse(await req.json());
        await prismaClient.upvotes.create({
            data: {
                userId: user.id,
                streamId: data.streamId,
            },
        });
        return NextResponse.json({
            message: "Upvote recorded successfully",
        }, {
            status: 201,
        });
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            Logger.error("Validation error while upvoting: " + e.errors);
            return NextResponse.json({
                message: ERROR_MESSAGES.INVALID_INPUT,
            }, {
                status: 400,
            });
        } else {
            Logger.error("Error while upvoting: " + (e as Error).message);
            return NextResponse.json({
                message: ERROR_MESSAGES.UPVOTE_ERROR,
            }, {
                status: 400,
            });
        }
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const stream = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    });
    return NextResponse.json({
        stream
    });
}
