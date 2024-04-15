import { Control, FieldError, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"
import { z } from "zod"
import { CreateProjectSchema } from "./validation-schemas"

export type CreateProjectType = z.infer<typeof CreateProjectSchema>


export type FormInputField = {
    type?: string
    placeholder: string
    register: UseFormRegister<CreateProjectType>
    valueAsNumber?: boolean
    name: keyof CreateProjectType
    error: FieldError | undefined
    information?: string[]
    rows?: number
    setValue: UseFormSetValue<CreateProjectType>
    trigger: UseFormTrigger<CreateProjectType>
    getValues: UseFormGetValues<CreateProjectType>
}

export type FormSliderField = {
    defaultValue?: number
    register: UseFormRegister<CreateProjectType>
    getValues: UseFormGetValues<CreateProjectType>
    error: FieldError | undefined
    name: "confidence"
    control: Control<CreateProjectType, any>
}

export type FormCurrencyInput = {
    defaultValue: string;
    error: FieldError | undefined
    name: "projectValue"
    control: Control<CreateProjectType, any>
    placeholder: string
}

export type FormDateTimePicker = {
    error: FieldError | undefined
    name: "dueDate"
    control: Control<CreateProjectType, any>
    trigger: UseFormTrigger<CreateProjectType>
    getValues: UseFormGetValues<CreateProjectType>
}