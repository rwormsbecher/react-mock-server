import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Label } from 'reactstrap';
import FormGroup from 'reactstrap/es/FormGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { gendersList, statusList } from '../models/lists/formLists';
import { IOptionType } from '../models/IOptionType';
import { createEmployee } from '../services/employee.service';
import { IEmployee } from './../models/IEmployee';

export const AddEmployeeForm = () => {
    const history = useHistory();

    const [gender, setGender] = useState<IOptionType>({ label: gendersList[0].label, value: gendersList[0].value });
    const [status, setStatus] = useState<IOptionType>({ label: statusList[0].label, value: statusList[0].value });
    const [error, setError] = useState<string>('');

    const validationSchema = yup.object().shape({
        firstname: yup.string().required().min(2),
        lastname: yup.string().required().min(2),
        email: yup.string().email().required(),
        status: yup.object().shape({
            label: yup.string(),
            value: yup.string(),
        }),
        gender: yup.object().shape({
            label: yup.string(),
            value: yup.string(),
        }),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleGenderChange = (option: IOptionType) => {
        setGender({ label: option.label, value: option?.value });
    };

    const handleStatusChange = (option: IOptionType) => {
        setStatus({ label: option.label, value: option?.value });
    };

    const onSubmit = async (data: any) => {
        const body: IEmployee = {
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            gender: gender.value ? gender.value : '',
            status: status.value ? status.value : '',
        };

        const error = await createEmployee(body, history);
        if (error) {
            setError(error?.error?.message);
        }
    };

    return (
        <div className="col-12">
            {error ? <p className="text-danger">There was an error: {error}</p> : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="firstname">First name</Label>
                    {errors.firstname && <p className="text-danger error-message">{errors.firstname.message}</p>}
                    <Input {...register('firstname')} />
                </FormGroup>

                <FormGroup>
                    <Label for="lastname">Last name</Label>
                    {errors.lastname && <p className="text-danger error-message">{errors.lastname.message}</p>}
                    <Input {...register('lastname')} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    {errors.email && <p className="text-danger error-message">{errors.email.message}</p>}
                    <Input {...register('email')} />
                </FormGroup>

                <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select
                                options={gendersList}
                                onChange={(value) => handleGenderChange({ value: value?.value, label: value?.label })}
                                onBlur={onBlur}
                                defaultValue={gender}
                                selected={value}
                            />
                        )}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="status">Status</Label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select
                                options={statusList}
                                onChange={(value) => handleStatusChange({ value: value?.value, label: value?.label })}
                                onBlur={onBlur}
                                value={status}
                                selected={value}
                            />
                        )}
                    />
                </FormGroup>

                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};
