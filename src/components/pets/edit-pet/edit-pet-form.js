import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

import TextInput from "../../form-components/text-input";
import SelectField from "../../form-components/select-field";
import CheckboxInput from "../../form-components/checkbox-input";
import TextArea from "../../form-components/textarea";
import DateField from "../../form-components/date-field";

const EditPetForm = ({ pet }) => {
    const history = useHistory();
    const types = [
        { value: "snake", label: "Snake" },
        { value: "lizard", label: "Lizard" },
        { value: "frog", label: "Frog" },
        { value: "toad", label: "Toad" },
    ];
    const typesSnakes = [
        { value: "corn snake", label: "Corn snake" },
        { value: "ball python", label: "Ball python" },
        { value: "kingsnake", label: "Kingsnake" },
    ];
    const typesLizards = [
        { value: "gecko", label: "Gecko" },
        { value: "bearded dragon", label: "Bearded dragon" },
    ];

    const getSpeciesArray = (type) => {
        switch (type) {
            case "snake":
                return typesSnakes;
            case "lizard":
                return typesLizards;
            default:
                return [{ value: "", label: "---" }];
        }
    };

    return (
        <Formik
            initialValues={{
                name: pet ? pet.name : "",
                type: pet ? pet.type : "",
                species: pet ? pet.species : "",
                speciesArray: pet ? getSpeciesArray(pet.type) : [{ value: "", label: "---" }],
                weight: pet ? pet.weight : "",
                feedFrequency: pet ? pet.feed_frequency : "",
                isAlive: pet ? pet.is_alive : true,
                notes: pet ? pet.notes : "",

                dateBorn: pet ? (pet.date_born ? new Date(pet.date_born) : "") : "",
                dateAcquired: pet ? (pet.date_acquired ? new Date(pet.date_acquired) : "") : "",
                dateRemoved: pet ? (pet.date_removed ? new Date(pet.date_removed) : "") : "",
                dateFed: pet ? (pet.date_fed ? new Date(pet.date_fed) : "") : "",
                dateCleaned: pet ? (pet.date_cleaned ? new Date(pet.date_cleaned) : "") : "",
                dateWeighed: pet ? (pet.date_weighed ? new Date(pet.date_weighed) : "") : "",
                dateShed: pet ? (pet.date_shed ? new Date(pet.date_shed) : "") : "",
                dateEliminated: pet
                    ? pet.date_eliminated
                        ? new Date(pet.date_eliminated)
                        : ""
                    : "",
            }}
            enableReinitialize
            onSubmit={(values) => {
                if (pet) {
                    // send to PUT endpoint
                } else {
                    console.log(values);
                    axios
                        .post(`${process.env.REACT_APP_DOMAIN}/pets/`, values, {
                            withCredentials: true,
                            headers: { "X-CSRF-TOKEN": Cookies.get("csrf_access_token") },
                        })
                        .then((response) => {
                            history.push("/");
                        })
                        .catch((error) => console.log(error.response));
                }
            }}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="pet-form">
                        <TextInput name="name" label="Name" />
                        <SelectField
                            name="type"
                            label="Type of animal"
                            id="type-select"
                            onChange={(event) => {
                                setFieldValue("type", event.target.value);
                                setFieldValue("speciesArray", getSpeciesArray(event.target.value));
                            }}
                        >
                            <option value="">---</option>
                            {types.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </SelectField>
                        <SelectField name="species" label="Species" id="species-select">
                            {values.speciesArray &&
                                values.speciesArray.map((sp) => {
                                    return (
                                        <option key={sp.value} value={sp.value}>
                                            {sp.label}
                                        </option>
                                    );
                                })}
                        </SelectField>
                        <TextInput name="weight" label="Weight in grams" />
                        <TextInput name="feedFrequency" label="Feeding frequency in days" />
                        {pet ? <CheckboxInput name="isAlive" label="Alive/owned?" /> : null}
                        <TextArea name="notes" label="Notes" />

                        <DateField name="dateBorn" label="Date born/hatched" />
                        <DateField name="dateAcquired" label="Date acquired" />
                        {pet ? <DateField name="dateRemoved" label="Date removed/died" /> : null}
                        <DateField name="dateFed" label="Date last fed" />
                        <DateField name="dateCleaned" label="Date last cleaned" />
                        <DateField name="dateWeighed" label="Date last weighed" />
                        <DateField name="dateShed" label="Date of last shed" />
                        <DateField name="dateEliminated" label="Date of last waste" />

                        <button type="submit">Save</button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EditPetForm;
