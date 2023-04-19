const { Configuration, OpenAIApi } = require("openai");
const { getParamsForBalance } = require('./intents/balance');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const routeRequest = async (req, res) => {
    const { Prompt } = req.body;

    const intent = classifyRequest(Prompt);

    if (intent === 'balance') {
        try {
            const response = await getParamsForBalance(Prompt);
            return response;
        }
        catch (error) {
            return {
                'code': '05',
                'data': {
                    'id': 1,
                    'text': error.message,
                    'type': 'response'
                }
            };
        }
    }

}

const classifyRequest = (request) => {
    const statement_keywords = [
        'statement',
        'account statement'
    ];

    for (const keyword of statement_keywords) {
        if (request.indexOf(keyword) !== -1) {
            return 'statement';
        }
    }

    const balance_keywords = [
        'balance',
        'account balance'
    ];

    for (const keyword of balance_keywords) {
        if (request.indexOf(keyword) !== -1) {
            return 'balance';
        }
    }
}

module.exports = {
    openai,
    routeRequest,
};