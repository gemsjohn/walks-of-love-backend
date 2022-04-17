async function createAccountHandler(event) {
  event.preventDefault();

  const id = document.querySelector('input[name="id"]').value.trim();
  const first_name = document.querySelector('input[name="first"]').value.trim();
  const last_name = document.querySelector('input[name="last"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();



  if ((id,email, first_name, last_name, password)) {

   if(document.getElementById('walk').checked) {

  
    const response = await fetch("https://pacific-depths-79804.herokuapp.com/api/walkers", {
      method: "POST",
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // document.location.reload();
      document.location.replace('/jobs');
    } else {
      alert(response.statusText);
    }
  }
}
}


document
  .querySelector(".create-account-form")
  .addEventListener('submit', createAccountHandler);


// console.log("test")
// console.log("test")
