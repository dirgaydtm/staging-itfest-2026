export const getPaymentStatusStyle = (status: string) => {
    switch (status) {
        case "belum terverifikasi":
            return "block w-full px-2 py-1 rounded-md text-sm bg-slate-600 text-white text-center";
        case "ditolak":
            return "block w-full px-2 py-1 rounded-md text-sm bg-red-700 text-white text-center";
        case "terverifikasi":
            return "block w-full px-2 py-1 rounded-md text-sm bg-green-800 text-white text-center";
        case "diproses":
            return "block w-full px-2 py-1 rounded-md text-sm bg-yellow-800 text-white text-center";
        default:
            return "px-2 py-1 rounded-md text-sm bg-gray-200";
    }
};