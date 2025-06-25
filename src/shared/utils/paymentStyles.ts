export const getPaymentStatusStyle = (status: string) => {
    switch (status) {
        case "belum terverifikasi":
            return "px-2 py-1 rounded-md text-sm bg-slate-600 text-white";
        case "ditolak":
            return "px-2 py-1 rounded-md text-sm bg-red-700 text-white";
        case "terverifikasi":
            return "px-2 py-1 rounded-md text-sm bg-green-800 text-white";
        case "diproses":
            return "px-2 py-1 rounded-md text-sm bg-yellow-800 text-white";
        default:
            return "px-2 py-1 rounded-md text-sm bg-gray-200";
    }
};