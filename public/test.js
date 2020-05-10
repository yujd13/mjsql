var instance = axios.create({baseURL: "http://localhost:3000"})
instance.post('/test', {data: TEST})
.then(function(response){
    console.log(response)
})