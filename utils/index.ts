import stripe from "@/config/stripe"
import { getAxiosInstance } from "./axios"
import { toast } from "sonner"
import { generateVideoSDKToken } from "@/actions";
import { addAppointmentAndRoomMap, getAppointmentRoomMap } from "@/services/therapist/therapist-service.";

export const getStripeProductNameById = async (id: string) => {
    return (await stripe.products.retrieve(id)).name
}

export const getSubscriptionByItsId = async (id: string) => {
    return (await stripe.subscriptions.retrieve(id))
}

export const getImageUrlOfS3 = (subPath: string): string => {
    const path = `${process.env.NEXT_PUBLIC_AWS_BUCKET_PATH}${subPath}`
    return path
}

export const getAppointmentDetails = async (id: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/client/appointment-by-id/${id}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch appointment details")
    }
}

export const getChatHistory = async (id: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/chats/chat-history/${id}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch chat history")
    }
}

export const getQueriesHistory = async (roomId: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/chats/queries-history/${roomId}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch queries history")
    }
}

export const getTicketDetails = async (roomId: string) => {
    try {
        const axiosInstance = await getAxiosInstance()
        return (await (await axiosInstance.get(`/client/tickets/get-ticket-by-room-id/${roomId}`))?.data)
    } catch (error) {
        toast.error("Failed to fetch ticket details")
    }
}



export const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
}

// Function to create a meeting room
export const createVideoSDKMeeting = async (appointmentId: string, participantId: string) => {
    const token = await generateVideoSDKToken(appointmentId, participantId)

    const { data: alreadyRoomExists } = await getAppointmentRoomMap(`/chats/video-room/${appointmentId}`)

    if (alreadyRoomExists.success) {
        const alreadyPresentRoomId = alreadyRoomExists?.data?.roomId;
        const checkResponse = await fetch(`https://api.videosdk.live/v1/meetings/${alreadyPresentRoomId}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })

        if (checkResponse.ok) {
            return {
                roomId: alreadyPresentRoomId,
                token
            }
        }

    }
    // Create a new meeting if it doesn't exist
    else {
        console.log('Creating new room')
        const response = await fetch('https://api.videosdk.live/v2/rooms', {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })

        if (!response.ok) {
            throw new Error('Failed to create meeting room');
        }
        const data = await response.json()
        await addAppointmentAndRoomMap('/chats/video-room', { appointmentId, roomId: data.roomId })
        return {
            roomId: data.roomId,
            token
        }
    }
}

export const downloadFileFromS3 = (subPath: string) => {
    const extension = subPath.split('.').pop();
    fetch(subPath)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], `${Date.now()}| "document"}.${extension}`, {
                type: "application/pdf",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.target = "_blank";
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(() => {
            toast.error("Failed to download PDF");
        });
}

export const nonMilitaryTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${parseInt(hours) % 12 || 12}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
}

export const validUSPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\+1\d{10}$/;
    return phoneRegex.test(phoneNumber) ? true : false
}