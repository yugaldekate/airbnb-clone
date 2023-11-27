'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { toast } from "react-hot-toast";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit,formState: {errors,} } = useForm<FieldValues>({
            defaultValues: {
                email: '',
                password: ''
            },
        });
  
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
            
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}  
                errors={errors}
                required={true}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline 
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {} }
            />
            <Button 
                outline 
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => {} }
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>First time using Airbnb?
                    <span onClick={onToggle} className="text-rose-500 font-semibold cursor-pointer hover:underline"> Create an account </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;