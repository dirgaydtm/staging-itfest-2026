interface StageConnectorProps {
    isPast: boolean;
    orientation: 'horizontal' | 'vertical';
    status?: string;
}

export const StageConnector = ({ isPast, orientation, status }: StageConnectorProps) => {
    const getConnectorColor = () => {
        // Menggunakan warna transparan figma terarah agar tidak terlalu mencolok/solid di background gelap
        if (status === 'lolos' || status === 'terverifikasi') return 'bg-green-500/60';
        if (status === 'tidak lolos') return 'bg-red-500/60';
        
        // Mengganti bg-purple-200 lama dengan warna biru keabuan figma asli (#3D5D71)
        if (isPast) return 'bg-[#3D5D71]';
        
        // Garis untuk stage yang belum dilalui
        return 'bg-white/10 border border-dashed border-white/5';
    };

    return (
        <div
            className={`
                ${orientation === 'horizontal' ? 'w-20 h-0.5' : 'w-0.5 h-20'}
                ${getConnectorColor()}
                transition-all duration-300 rounded-full
            `}
        />
    );
};