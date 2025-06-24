interface StageConnectorProps {
    isPast: boolean;
    orientation: 'horizontal' | 'vertical';
    status?: string;
}

export const StageConnector = ({ isPast, orientation, status }: StageConnectorProps) => {
    const getConnectorColor = () => {
        if (status === 'lolos' || status === 'terverifikasi') return 'bg-green-400';
        if (status === 'tidak lolos') return 'bg-red-400';
        if (isPast) return 'bg-purple-200';
        return 'bg-white/30 animate-pulse';
    };

    return (
        <div
            className={`
        ${orientation === 'horizontal' ? 'w-20 h-1' : 'w-1 h-20'}
        ${getConnectorColor()}
        transition-colors duration-200
      `}
        />
    );
};