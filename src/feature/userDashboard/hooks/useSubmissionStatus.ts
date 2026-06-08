import { useEffect, useCallback } from "react";

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
    const handleClose = useCallback(() => {
        onClose();
        window.location.reload();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                handleClose();
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [isOpen, timeout, handleClose]);

    return { handleClose };
};