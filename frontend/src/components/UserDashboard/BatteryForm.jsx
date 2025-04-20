import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { predictRul_initialValues, predictRulValidationSchema } from '../../lib/server_actions/utils';
import { PredictRulSubmitHandler } from '../../lib/client_actions/user.actions';
import { toast } from 'react-toastify';  // Import toast for notifications

const PredictRulForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [RUL, setRUL] = useState(null);  // To store the predicted RUL value

    return (
        <div className="right-box">
            <div className="glass-form">
                <h2>Know the Remaining Useful Life of you Battery Now...</h2>
                <Formik
                    initialValues={predictRul_initialValues}
                    validationSchema={predictRulValidationSchema}
                    onSubmit={async (values, actions) => {
                        setIsSubmitting(true);
                        await PredictRulSubmitHandler(values, actions, setRUL);  // Pass setRUL here
                        setIsSubmitting(false);
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="input-group">
                                <div>
                                    <label>Discharge Time: </label>
                                    <Field
                                        type="number"
                                        name="dischargeTime"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="dischargeTime" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Decrement: </label>
                                    <Field
                                        type="number"
                                        name="decrement"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="decrement" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Max Voltage Discharge: </label>
                                    <Field
                                        type="number"
                                        name="maxVoltageDischarge"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="maxVoltageDischarge" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Min Voltage Charge: </label>
                                    <Field
                                        type="number"
                                        name="minVoltageCharge"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="minVoltageCharge" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Time at 4.15V: </label>
                                    <Field
                                        type="number"
                                        name="timeAt4_15v"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="timeAt4_15v" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Time Constant Current: </label>
                                    <Field
                                        type="number"
                                        name="timeConstantCurrent"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="timeConstantCurrent" component="div" className="error-message" />
                                </div>

                                <div>
                                    <label>Charging Time: </label>
                                    <Field
                                        type="number"
                                        name="chargingTime"
                                        className="input-field"
                                    />
                                    <ErrorMessage name="chargingTime" component="div" className="error-message" />
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={isSubmitting}  // Disable button while submitting
                                >
                                    {isSubmitting ? "Predicting..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {RUL !== null && (
                    <div className="rul-box">
                        <h3>Approx. remaining useful life of the battery is: </h3>
                        <p>{RUL}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictRulForm;