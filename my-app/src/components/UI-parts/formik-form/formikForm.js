// import React from 'react';
// import { withFormik } from 'formik';
// // const handleErrors= (errors, props)=>{
// //   console.log('err', errors);
// //   console.log('props', props)
// // }
// const MyForm = props => {
//   const {
//     values,
//     touched,
//     errors,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//   } = props;
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         onChange={handleChange}
//         onBlur={e=>{
//           // handleBlur(e)
//           console.log(e)
//         }}
//         value={values.name}
//         name="name"
//       />
//       {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// const MyEnhancedForm =  withFormik({
//   mapPropsToValues: () => ({ name: '' }),

//   // Custom sync validation
//   validate: values => {
//     const errors = {};

//     if (!values.name) {
//       errors.name = 'Required';
//     }

//     return errors;
//   },
//   handleSubmit: (values, { setSubmitting }) => {
//     setTimeout(() => {
//       alert(JSON.stringify(values, null, 2));
//       setSubmitting(false);
//     }, 1000);
//   },
//   displayName: 'BasicForm',
// })(MyForm);
// export default MyEnhancedForm;
import React, { Fragment } from "react";
import { Formik, Field } from "formik";

import * as yup from "yup";

const intialState = {
  name: "",
  email: "",
  password: ""
};
const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .max(13)
    .min(8)
});
function MyComponent(props) {
  return (
    <Fragment>
      <Formik
        initialValues={intialState}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
        handleChange = {()=>{
          console.log('ggs')
        }}
        validationSchema={userSchema}
         validateOnChange={false}
      >
        {props => (
          <form onSubmit={props.handleSubmit} >
            <Field
              type="email"
              placeholder="Enter email"
              onChange={props.handleChange}
              name="email"
              value={props.values.email}
              validateonblur='false'
            />
            {props.errors.email && props.touched.email ? (
              <span >{props.errors.email}</span>
            ) : (
              ""
            )}
            <Field
              type="password"
              onChange={props.handleChange}
              name="password"
              value={props.values.password}
              placeholder="Password"
              
            />
            {props.errors.password && props.touched.password ? (
              <span >{props.errors.password}</span>
            ) : (
              ""
            )}
            <Field
              name="name"
              onChange={props.handleChange}
              value={props.values.name}
              type="text"
              placeholder="Name"
              
            />
            {props.errors.name && props.touched.name ? (
              <span>{props.errors.name}</span>
            ) : (
              ""
            )}
            <button
              type="submit"
              disabled={!props.dirty && !props.isSubmitting}
              
            >
              Submit
            </button>
            <button
              disabled={!props.dirty}
              onClick={props.handleReset}
              type="button"
            
            >
              Reset
            </button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default MyComponent;