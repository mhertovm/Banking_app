

const response = await fetch('http://localhost:4000/register', {
    method: 'POST',
    body: JSON.stringify({
      name: "cliUserName",
      surname: values.surname,
      email: values.email ,
      password: values.password ,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });