import axios from "axios";

const API_URL = "http://localhost:8000/v1/bets/";
const API_KEY = "nigga"; 

/**
 * 
 * @param {*} bet 
 */
export const placeBet = async (bet_amount, bet_number) => {
    try {
       
        const payload = {bet_amount, bet_number};

        const response = await axios.post(API_URL, payload, {
            headers: { 
                apikey: API_KEY,
                token: sessionStorage.getItem('token')
             },
        });

        return response;

    } catch(error) {
        throw new Error('Place Bet Failed 🔴');
    }
}


export const getUserBets = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/v1/bets/getBetsUser`, {
            headers: {
                apikey: API_KEY,
                token: sessionStorage.getItem('token')
            },
        });

        return response;
    } catch(error) {
        throw new Error('Get User Bets Failed 🔴')
    }
}