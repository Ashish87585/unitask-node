1) npm install
2) npm run start

### API ###

1) Register 

Post localhost:4000/api/users/register

{
    "email": "as@gmail.com",
    "password": "12345678",
    "username": "ashish"
}

2) Login

Post localhost:4000/api/users/login

{
    "email": "as@gmail.com",
    "password": "12345678"
}

3) Logout 

Get localhost:4000/api/users/logout

4) View profile

Get localhost:4000/api/users/profile/63b68f9db22f3eed3d1d8a94
