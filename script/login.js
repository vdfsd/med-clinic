function loginForm() {
    const btnLogin = document.querySelector(".btn-login");
    const modalBg = document.querySelector(".modal-bg");
    const inputEmail = document.querySelector("#exampleInputEmail1");
    const inputPassword = document.querySelector("#exampleInputPassword1");
    const submitLogin = document.querySelector("#submitLogin");
    const spinnerWrap = document.createElement("div");
    const btnCreateCard = document.querySelector(".btn-create-card");
    
    btnCreateCard.addEventListener('click', () => {
     const defaultValueSelectDoctor = document.querySelector('.defaultValueSelectDoctor');
       defaultValueSelectDoctor.setAttribute('selected', '')
       btnCreateCard.classList.add('def');
    // const selectDoctor = document.querySelector("doctor-select");
    // selectDoctor.value = 'default';
  
    })
  
    const incorrectLogin = document.createElement("div");
    incorrectLogin.classList.add("incorrectLogin");
    incorrectLogin.textContent = "Невірний email або пароль";
  
    // функция создания спиннера-----------------
    function createSpinner() {
      const spinner = document.createElement("img");
      spinner.classList.add("spinner");
      spinner.src = "./spinner.svg";
      spinnerWrap.append(spinner);
    }
    createSpinner();
    //---------------------------------------
  
    //событие на задний фон модального окна-----
    modalBg.addEventListener("click", (e) => {
      if (e.target === modalBg) {
        incorrectLogin.remove();
        modalBg.classList.add("hide");
        inputEmail.value = "";
        inputPassword.value = "";
      }
    });
    //---------------------------------------
  
    // событие на кнопку логина в хедере
    btnLogin.addEventListener("click", (e) => {
      modalBg.classList.remove("hide");
    });
    //----------------------------------------------
  
    // событие на кнопку авторизации в форме ----------------
    submitLogin.addEventListener("click", (e) => {
      e.preventDefault();
      incorrectLogin.remove();
      submitLogin.after(spinnerWrap);
      const inputEmailValue = inputEmail.value;
      const inputPasswordValue = inputPassword.value;
  
      fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: "POST",
        // Authorization: `Bearer ${token}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: inputEmailValue,
          password: inputPasswordValue,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            spinnerWrap.remove();
            modalBg.classList.add("hide");
            inputEmail.value = "";
            inputPassword.value = "";
            
            btnCreateCard.classList.remove("hide");
            btnLogin.style.display = "none";
            return res.text();
          } else {
            spinnerWrap.remove();
            submitLogin.after(incorrectLogin);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  
    //----------------------------------------------------------
  }
  loginForm();