import React from "react"
import "./register.css"
import API from "../../utils/API"
import { useStoreContext } from "../../utils/Store";
import { Formik } from "formik"
import * as Yup from "yup"
import Error from "./Error";

//here we have some schema for the validation we are usin YUP a npm package that does that for us. 
// We can change what it will be displayed to the usere!
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too Short!")
    .max(255, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Must be a valid e-mail!")
    .max(255, "Too Long!")
    .required("Required"),
  bio: Yup.string()
    .min(2, "C'mon , we want to know more about you!")
    .max(255, "Too Long!")
    .required("Required"),


})

//this class has the form with the user profile when form it's submited 
//  it will send to our DB after pass the validation we set up above


function RegisterForm(props) {

  const [state, dispatch] = useStoreContext();

  return (
    <div>

      <Formik
        initialValues={{
          picture: state.user.signInUserSession.idToken.payload.picture,
          name: state.user.signInUserSession.idToken.payload.name,
          email: state.user.signInUserSession.idToken.payload.email,
          bio:""

        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubtmitting }) => {
          ///update the user in the db

          API.updateUser({
            picture: values.picture,
            name: values.name,
            bio: values.bio,
            profession: values.profession,
            email: values.email,
            motives: values.motives

          }).then(res => {
             props.handleModalClose();
            // console.log("Saved to database")
          })
        }}


      >

        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (

            <form onSubmit={handleSubmit}>
              <nav className=" modalNav  p-1">Your Profile</nav>



              <div className="container  modalStyle">
                <div className="row ">

                  <div className="col-6 text-center">


                    <img className="userImageForm" src={values.picture} alt="userPicture" />






                    <p className=" 
nameRegisterForm text-center "
                      name="name"
                      id="name"
                    > {values.name}</p>



                    <p className=" emailRegisterForm text-center"
                      type="email"
                      name="email"
                      id="user_email"
                    >{values.email}</p>






                  </div>

                  <div className="col-6">

                    <div className="row   my-2 form-group">
                      <label htmlFor=""></label>
                      <textarea name="bio"
                       
                        placeholder="Write a brief description about yourself..."
                        value={values.bio}
                        rows="4"
                        cols="45"
                        onChange={handleChange}
                        className={touched.bio && errors.bio ? "has-error" : null}

                      > </textarea>
                      <div className="inputError">
                        <Error touched={touched.bio} message={errors.bio} />
                      </div>
                    </div>


                    <div className="row form-group">
                      <label htmlFor="profession">Profession:</label>
                      <input className="input-group-append"
                        // value={this.company}
                        type="text"
                        name="profession"
                        id="user_profession"
                        value={values.profession}
                        onChange={handleChange}
                      />
                      <i className="fas fa-pen mx-2"></i>

                    </div>
                    <div className=" form-group">
                      {/* <label className="motivesLabel" htmlFor="motives">What brings you here today?</label> */}
                      <p className="motivesLabel">What brings you here today?</p>

                      <select onChange={handleChange}
                        onBlur={handleBlur}
                        className="custom-select col-8 form-select"
                        name="motives"
                        value={values.motives}
                        id="user_motive">

                        <option value="Networking">Networking</option>
                        <option value="Looking for a position">Looking for a position</option>
                        <option value="I am a recruiter">I am a recruiter</option>


                      </select>
                      <div className="  float-right">
                        <button className=" button submitBtn"
                          type="submit"

                          disabled={isSubmitting}
                        >



                          <i className="fas fa-check"></i>
                        </button>
                      </div>
                    </div>




                  </div>

                </div>

              </div>
            </form>
          )}
      </Formik>



    </div >



  )

}

export default RegisterForm