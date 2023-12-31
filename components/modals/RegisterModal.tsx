'use client';

import axios from "axios";
import { useCallback, useState } from "react";

import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Modal from "./Modal";
import Heading from "../Heading"
import CustomInput from "../inputs/CustomInput";
import CustomButton from "../CustomButton";

import { signIn } from "next-auth/react";

const RegisterModal= () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {errors} } = useForm<FieldValues>({
            defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-5">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            
            <CustomInput
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomInput
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomInput
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <CustomButton 
                outline 
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google') } 
            />
            <CustomButton 
                outline 
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github') }
            />
            <div 
                className="text-neutral-500 text-center mt-4 font-light">
                <p>Already have an account?
                    <span onClick={onToggle} className="cursor-pointer hover:underline font-semibold text-rose-500"> Log in </span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;
