const token = ""

async function register(){
  for(let i = 0; i<=100; i++){
    try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          body: JSON.stringify({
            name: "name" + i,
            surname: "surname" + i,
            email: "hhgammemaillkkjj" + i ,
            password: "1234" ,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        console.log(response.json())
    } catch (err) {
        console.log(err);
    }
  }
}

async function addCard(){
  for(let i = 0; i<=100; i++){
    try{
      const response = await fetch('http://localhost:4000/addcard', {
      method: 'POST',
      body: JSON.stringify({
          user_id: 1,
          cardName: "4card" + i
      }),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      "Authorization": token,
      },
      })
      console.log(response.json())
    } catch(err){
      console.log(err)
    }
  };
}

async function transfer(values){
  for(let i = 0; i<=100; i++){
  try{
    const response = await fetch('http://localhost:4000/transfer', {
    method: 'POST',
    body: JSON.stringify({
      sourceCard: "12344",
      destinationCard: "12343",
      sum : "1"
    }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": token,
    },
    })
      console.log(response.json())
  } catch(err){
    console.log(err)
  }
};
}
// register()
// addCard()
// transfer()
