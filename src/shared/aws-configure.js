const AWS = require("aws-sdk");

const translate = new AWS.Translate({ region: process.env.REGION });

const DynamoDBClient = (options) => {
  return new AWS.DynamoDB.DocumentClient(options);
};

const TranslateText = async (text) => {
  const params = {
    Text: text,
    SourceLanguageCode: "en",
    TargetLanguageCode: "es",
  };

  try {
    const translation = await translate.translateText(params).promise();
    return translation.TranslatedText;
  } catch (error) {
    console.error('Error', error);
    return text;
  }
};

module.exports = {
  DynamoDBClient,
  TranslateText
};
