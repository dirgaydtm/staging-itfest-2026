import { useEffect } from "react";

interface UseSubmissionStatusProps {
    isOpen: boolean;
    timeout?: number;
    onClose: () => void;
}

export const useSubmissionStatus = ({
    isOpen,
    timeout = 5000,
    onClose,
}: UseSubmissionStatusProps) => {
    const handleClose = () => {
        onClose();
        window.location.reload();
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                handleClose();
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [isOpen, timeout]);

    return { handleClose };
};
