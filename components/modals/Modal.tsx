'use client'

import { useCallback, useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import CustomButton from "../CustomButton";

interface ModalProps {
    title?: string;
    isOpen?: boolean;
    disabled?: boolean;
    actionLabel: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    secondaryActionLabel?: string;
    onClose: () => void;
    onSubmit: () => void;
    secondaryAction?: () => void;
}

const Modal : React.FC<ModalProps> = ({ title, isOpen, disabled, actionLabel, body, footer, secondaryActionLabel, onClose, onSubmit, secondaryAction}) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);
  
    const handleClose = useCallback(() => {
        //if loading
        if (disabled) {
            return;
        }
        
        setShowModal(false);//for modal's whole screen
        
        setTimeout(() => {
            onClose();//for center modal 
        }, 300);

    }, [onClose, disabled]);
  
    const handleSubmit = useCallback(() => {
        //if loading
        if (disabled) {
            return;
        }
    
        onSubmit();
    }, [onSubmit, disabled]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // Close the modal only if the click is on the overlay outside the content div
        if (modalRef.current && e.target === modalRef.current) {
            handleClose();
        }
    };
  
    const handleSecondaryAction = useCallback(() => {
        //if loading or not having secondaryAction
        if (disabled || !secondaryAction) {
            return;
        }
    
        secondaryAction();
    }, [secondaryAction, disabled]);
  
    // ******* if not open show nothing *******
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div ref={modalRef} onClick={handleOverlayClick} className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-full">
                    {/*content*/}
                    <div className={`translate duration-300 h-full flex justify-center items-center
                                ${showModal ? 'translate-y-0' : 'translate-y-full'} 
                                ${showModal ? 'opacity-100' : 'opacity-0'}`
                            }
                    >
                        <div className="translate relative flex flex-col w-full overflow-y-auto h-full md:h-[95%]  border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="relative flex justify-center items-center p-6 rounded-t border-b-[1px]">
                                <button onClick={handleClose} className="transition absolute left-9 p-1 border-0  hover:opacity-70">
                                    <IoMdClose size={23} />
                                </button>
                                <div className="text-lg font-semibold">
                                    {title}
                                </div>
                            </div>

                            <div className="overflow-auto custom-scrollbar" >
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    {body}
                                </div>

                                {/*footer*/}
                                <div className="flex flex-col gap-2 p-6">
                                    <div className="flex flex-row items-center gap-4 w-full">
                                        {secondaryAction && secondaryActionLabel && (
                                            <CustomButton 
                                                outline={true}
                                                disabled={disabled} 
                                                label={secondaryActionLabel} 
                                                onClick={handleSecondaryAction}
                                            />  
                                        )}

                                        <CustomButton 
                                            label={actionLabel} 
                                            disabled={disabled} 
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                    {footer}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal