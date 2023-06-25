import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/v1'

const signupApi = {
	createUser: async () => {
    const response = await axios.post(`${BASE_URL}/auth/users/`, {
      Object: newUser
    })
    return response.data
  },
} // フォームからインプットされるtextがどこから来ているか？ createTweetがどこ？
