import React from "react";
import './login.css'


function LoginPage (){
    return(
      <body>
        <div class="vh-100 row align-items-start position-relative">
        {/*<!--Coluumna 1 imagenes de fondo-->*/}
        <div class="col vh-100" id="columna1">
          <div class="position-absolute top-0 start-0">
            <img src="/img/Group 4.png" />
          </div>
          <div class="grupo5 position-absolute bottom-0 start-0">
            <img src="/img/Group 5.png" />
          </div>
        </div>
        {/*<!--Coluumna 2 formulario-->*/}
        <div class="col vh-100" id="columna2">
          <div class="position-absolute top-50 start-50 translate-middle">
            <div class="row">
              <div class="login text-center">
                <div class="head">
                  <h1>Bienvenido de vuelta</h1>
                </div>
  
                <div class="body">
                  <form>
                    <div class="form-group">
                      <label for="email" class="text-left">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Ingrese su email"
                      />
                    </div>
  
                    <div class="form-group">
                      <label for="contraseña" class="text-left">Contraseña</label>
                      <input
                        type="password"
                        class="form-control"
                        id="contraseña"
                        placeholder="Ingrese su contraseña"
                      />
  
                      <button class="btn btn-black" id="checkButton"></button>
                    </div>
  
                    <p><a href="#">¿Olvidó su contraseña?</a></p>
  
                    <button
                      id="btn-ingresar"
                      type="submit"
                      class="btn btn-primary"
                    >
                      Ingresar
                    </button>
                  </form>
  
                  <p><a href="/registroPage">¿No tienes cuenta?</a></p>
                </div>
  
                <div class="footer">
                  <div class="icons">
                    <div class="logoGoogle">
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          viewBox="0 0 48 48"
                          id="icon_google"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                          <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          ></path>
                          <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          ></path>
                          <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                        </svg>
                      </a>
                    </div>
  
                    <div class="logoFacebook">
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          viewBox="0 0 48 48"
                          id="icon_facebook"
                        >
                          <linearGradient
                            id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                            x1="9.993"
                            x2="40.615"
                            y1="9.993"
                            y2="40.615"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stop-color="#2aa4f4"></stop>
                            <stop offset="1" stop-color="#007ad9"></stop>
                          </linearGradient>
                          <path
                            fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                          ></path>
                        </svg>
                      </a>
                    </div>
  
                    <div class="logoApple">
                      <a href="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50"
                          height="50"
                          viewBox="0 0 50 50"
                          id="icon_apple"
                        >
                          <path
                            d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/*<!--Coluumna 3 imagenes de fondo-->*/}
        <div class="col vh-100 position-relative" id="columna3">
          <div
            class="grupo6 d-flex justify-content-end align-items-start position-absolute top-0 end-0"
          >
            <img src="/img/Group 6.png" />
          </div>
  
          <div
            class="grupo6 d-flex justify-content-end align-items-end position-absolute bottom-0 end-0"
          >
            <img src="/img/Group 3.png" />
          </div>
        </div>
      </div>
      </body>
    );
}

export default LoginPage;