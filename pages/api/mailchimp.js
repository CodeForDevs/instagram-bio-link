import axios from 'axios';

export default async (req, res) => {

    const { validLowerCase } = req.body

    // Load environment variables and set the DATACENTER.
    const API = process.env.MAIL_CHIMP_API;
    const AUDIENCE = process.env.MAIL_CHIMP_AUDIENCE;
    const DATACENTER = API.split('-')[1];

    //Body message
    const data = {
        email_address: validLowerCase,
        status: 'subscribed'
    }

    try {
        axios.post(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE}/members`,
            JSON.stringify(data),
            {
                headers: {
                    'Authorization': `auth ${API}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                // If something is wrong
                if (response.status >= 400) {
                    return res.status(400).json('Something went wrong.');
                }
                // Email successfully subscribed
                return res.status(200).json('Email subscribed!');
            })
            .catch(error => {
                return res.status(500).json('Something went wrong.');
            })

    } catch (error) {
        // If something is wrong
        return res.status(500).json('Something went wrong.');
    }

}
