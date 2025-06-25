export interface Announcement {
    id_announcement: string;
    message_announcement: string;
    date_announcement: string;
}

export interface AnnouncementResponse {
    status: {
        code: number;
        isSuccess: boolean;
    };
    message: string;
    data: Announcement[];
}
