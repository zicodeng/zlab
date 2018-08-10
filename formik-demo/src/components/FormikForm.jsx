import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

/**
 * CustomForm1 is a simple form component created with HTML tags.
 * @param props props will be populated and passed by Formik HoC: https://github.com/jaredpalmer/formik#formik-props
 *
 * We destructure props here to make data more accessible
 *
 * values: contains current values for all inputs
 *
 * errors: invalid field error message
 *
 * touched: a boolean that indicates whether this input field has been visited.
 * By default, Formik will try to prompt error messages as the user is changing input field.
 * To prevent this behavior, we need to make sure the input field has been touched,
 * so the error messages will only show up during form submission.
 *
 * isSubmitting: is the form currently being submitted. The value can be be managed by setSubmitting() function.
 *
 * handleChange: a function that handles input change
 *
 * handleSubmit: a function that handles form submission
 */
const CustomForm1 = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit
}) => (
    <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', width: '400px' }}
    >
        <div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <label>
            <input
                type="checkbox"
                name="newsletter"
                checked={values.newsletter}
            />
            Join our newsletter
        </label>
        <select name="plan" value={values.plan}>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
        </select>
        <button type="submit" disabled={isSubmitting}>
            Submit
        </button>
    </form>
);

/**
 * CustomForm2 is also a simple form component created with Formik pre-defined elements
 * By creating a form this way, it is much cleaner and less code to maintain.
 */
const CustomForm2 = ({ values, errors, touched, isSubmitting }) => (
    <Form style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
        <div>
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && <p>{errors.email}</p>}
        </div>
        <div>
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && <p>{errors.password}</p>}
        </div>
        <label>
            <Field
                type="checkbox"
                name="newsletter"
                checked={values.newsletter}
            />
            Join our newsletter
        </label>
        <Field component="select" name="plan">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
        </Field>
        <button type="submit" disabled={isSubmitting}>
            Submit
        </button>
    </Form>
);

// There are two methods for creating a Formik form

/**
 * Method 1:
 *
 * withFormik() is very much like connect() in Redux.
 *
 * It is a higher-order function that accepts a configuration object (https://github.com/jaredpalmer/formik#withformikoptions)
 * and returns a Higher-order component.
 *
 * A HoC is another function that accepts a component and returns a new component.
 */
export const FormikForm1 = withFormik({
    // We can also pass props to FormikForm,
    // and the props will be available here.
    mapPropsToValues({ email, password, newsletter, plan }) {
        return {
            // Property name needs to match exactly to name attribute in input element
            email: email || '',
            password: password || '',
            newsletter: newsletter || false,
            plan: plan || 'premium'
        };
    },
    // values are user input data from the form.
    // Formik will magically gather them for us.
    // All handleSubmit props: https://github.com/jaredpalmer/formik#handlesubmit-values-values-formikbag-formikbag--void
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        // Simulate async API request
        setTimeout(() => {
            if (values.email === 'zicodeng@gmail.com') {
                setErrors({
                    email: 'That email is already taken'
                });
            } else {
                // Clear form
                resetForm();
                setSubmitting(false);
            }
        }, 2000);
        console.log(values);
    },
    // A Yup schema for form validation
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    })
})(CustomForm1);
